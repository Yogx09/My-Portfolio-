"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import RetroTerminalOS, { NavTab } from "./RetroTerminalOS";
import { retroAudio } from "./RetroAudio";
import { Power, Rotate3d, Sparkles, Sun, Palette, Crown } from "lucide-react";

interface RetroWorkstation3DCanvasProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNavigateSection?: (sectionId?: string) => void;
  onTriggerToast?: (msg: string) => void;
}

export default function RetroWorkstation3DCanvas({
  activeTab,
  onSelectTab,
  onNavigateSection,
  onTriggerToast,
}: RetroWorkstation3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const screenDomRef = useRef<HTMLDivElement>(null);

  // Hardware states
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [brightnessLevel, setBrightnessLevel] = useState(1.0);
  const [ambientThemeIndex, setAmbientThemeIndex] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Rich luxury studio ambient themes
  const ambientThemes = [
    { name: "Royal Gold & White", color1: 0xf59e0b, color2: 0xfef08a, color3: 0xd97706, hex: "from-amber-300 via-yellow-400 to-amber-500" },
    { name: "Starlight Aurora", color1: 0x38bdf8, color2: 0xfbbf24, color3: 0xa855f7, hex: "from-cyan-400 via-amber-300 to-purple-500" },
    { name: "Champagne Sunset", color1: 0xf43f5e, color2: 0xfbbf24, color3: 0xec4899, hex: "from-rose-400 via-amber-300 to-pink-500" },
    { name: "Emerald Gold", color1: 0x10b981, color2: 0xfbbf24, color3: 0x06b6d4, hex: "from-emerald-400 via-yellow-300 to-cyan-500" },
  ];

  // Interaction refs
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.02, y: -0.02 });
  const currentRotationRef = useRef({ x: 0.02, y: -0.02 });
  const auraLight1Ref = useRef<THREE.PointLight | null>(null);
  const auraLight2Ref = useRef<THREE.PointLight | null>(null);
  const logoLightRef = useRef<THREE.PointLight | null>(null);
  const logoMeshRef = useRef<THREE.Mesh | null>(null);

  const handlePowerToggle = () => {
    if (isPoweredOn) {
      retroAudio.playBeep(350, 0.1, "sawtooth");
      setIsPoweredOn(false);
      onTriggerToast?.("⚡ Studio Display Put to Sleep");
      if (logoLightRef.current) logoLightRef.current.intensity = 0.05;
      if (auraLight1Ref.current) auraLight1Ref.current.intensity = 0.2;
      if (auraLight2Ref.current) auraLight2Ref.current.intensity = 0.2;
      if (logoMeshRef.current) {
        (logoMeshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.1;
      }
    } else {
      retroAudio.playBeep(1200, 0.12, "sine");
      setIsPoweredOn(true);
      onTriggerToast?.("👑 Ceramic White & Gold Studio Display Woken");
      if (logoLightRef.current) logoLightRef.current.intensity = 1.6;
      if (auraLight1Ref.current) auraLight1Ref.current.intensity = 2.4;
      if (auraLight2Ref.current) auraLight2Ref.current.intensity = 2.4;
      if (logoMeshRef.current) {
        (logoMeshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.0;
      }
    }
  };

  const handleBrightnessChange = () => {
    retroAudio.playBeep(880, 0.04);
    setBrightnessLevel((prev) => {
      const next = prev >= 1.25 ? 0.9 : +(prev + 0.15).toFixed(2);
      onTriggerToast?.(`Retina Luminance: ${Math.round(next * 100)}% (Crystal Clear HDR)`);
      return next;
    });
  };

  const handleCycleAura = () => {
    retroAudio.playBeep(1080, 0.05);
    const nextIdx = (ambientThemeIndex + 1) % ambientThemes.length;
    setAmbientThemeIndex(nextIdx);
    const theme = ambientThemes[nextIdx];
    onTriggerToast?.(`Ambient Aura: ${theme.name}`);

    if (auraLight1Ref.current && auraLight2Ref.current) {
      auraLight1Ref.current.color.setHex(theme.color1);
      auraLight2Ref.current.color.setHex(theme.color3);
    }
  };

  const handleKeyPress = (keyLabel: string, action?: () => void) => {
    retroAudio.playKeyClick();
    setActiveKey(keyLabel);
    setTimeout(() => setActiveKey(null), 100);

    if (action) {
      action();
      return;
    }

    if (keyLabel === "1") onSelectTab("home");
    else if (keyLabel === "2") onSelectTab("projects");
    else if (keyLabel === "3") onSelectTab("about");
    else if (keyLabel === "4") onSelectTab("skills");
    else if (keyLabel === "5") onSelectTab("experience");
    else if (keyLabel === "6") onSelectTab("blog");
    else if (keyLabel === "7") onSelectTab("contact");
    else if (keyLabel === "ESC") {
      onSelectTab("home");
      onTriggerToast?.("Keyboard ESC -> Returning HOME");
    } else if (keyLabel === "PWR") {
      handlePowerToggle();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = webglCanvasRef.current;
    const screenDom = screenDomRef.current;
    if (!container || !canvas || !screenDom) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Dual 3D Scenes
    const scene = new THREE.Scene();
    const cssScene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 7.2);

    // 2. High-Fidelity WebGL Renderer
    const webglRenderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    webglRenderer.setSize(width, height);
    webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    webglRenderer.shadowMap.enabled = true;
    webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    webglRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    webglRenderer.toneMappingExposure = 1.25;

    // 3. CSS3D Renderer for Razor-Sharp Native Screen
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(width, height);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0";
    cssRenderer.domElement.style.left = "0";
    cssRenderer.domElement.style.width = "100%";
    cssRenderer.domElement.style.height = "100%";
    cssRenderer.domElement.style.pointerEvents = "none";
    cssRenderer.domElement.style.zIndex = "10";
    container.appendChild(cssRenderer.domElement);

    // 4. Clean Pure White Studio Lighting Rig (Zero Golden Haze)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Pure Studio Daylight Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5.5, 9.0, 6.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Soft Pure White Fill Light
    const fillLight = new THREE.DirectionalLight(0xf8fafc, 1.6);
    fillLight.position.set(-6.5, 3.5, 4.5);
    scene.add(fillLight);

    // Specular Rim Light
    const goldRimLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
    goldRimLight.position.set(4.5, 4.0, -6.0);
    scene.add(goldRimLight);

    // Dynamic Ambient Backlight Aura (Ambilight glow)
    const currentTheme = ambientThemes[ambientThemeIndex];
    const auraLight1 = new THREE.PointLight(currentTheme.color1, 1.2, 5.0, 1.5);
    auraLight1.position.set(-1.8, 0.9, -0.8);
    scene.add(auraLight1);
    auraLight1Ref.current = auraLight1;

    const auraLight2 = new THREE.PointLight(currentTheme.color3, 1.2, 5.0, 1.5);
    auraLight2.position.set(1.8, 0.9, -0.8);
    scene.add(auraLight2);
    auraLight2Ref.current = auraLight2;

    // Glowing On-Logo Point Light
    const logoLight = new THREE.PointLight(0xfbbf24, 1.2, 2.0, 1.5);
    logoLight.position.set(0, -0.65, 0.2);
    scene.add(logoLight);
    logoLightRef.current = logoLight;

    // ============================================================
    // PROCEDURAL TEXTURE GENERATION FOR KEYBOARD & ACCESSORIES
    // ============================================================
    // 1. PBT Matte Keycap Micro-Texture with Bevel Highlight
    const keycapCanvas = document.createElement("canvas");
    keycapCanvas.width = 256;
    keycapCanvas.height = 256;
    const kCtx = keycapCanvas.getContext("2d");
    if (kCtx) {
      kCtx.fillStyle = "#ffffff";
      kCtx.fillRect(0, 0, 256, 256);
      // Soft beveled border shading
      kCtx.strokeStyle = "rgba(0,0,0,0.08)";
      kCtx.lineWidth = 14;
      kCtx.strokeRect(7, 7, 242, 242);
      kCtx.strokeStyle = "rgba(255,255,255,0.9)";
      kCtx.lineWidth = 6;
      kCtx.strokeRect(14, 14, 228, 228);
      // Tactile PBT micro-stipple grain
      for (let i = 0; i < 3500; i++) {
        const gx = Math.random() * 256;
        const gy = Math.random() * 256;
        const tone = Math.random() > 0.5 ? 255 : 225;
        kCtx.fillStyle = `rgba(${tone},${tone},${tone},0.07)`;
        kCtx.fillRect(gx, gy, 1.5, 1.5);
      }
    }
    const keycapTexture = new THREE.CanvasTexture(keycapCanvas);
    keycapTexture.wrapS = THREE.RepeatWrapping;
    keycapTexture.wrapT = THREE.RepeatWrapping;

    // 2. Keyboard Chassis Fine Brushed Aluminum Texture
    const chassisCanvas = document.createElement("canvas");
    chassisCanvas.width = 512;
    chassisCanvas.height = 512;
    const cCtx = chassisCanvas.getContext("2d");
    if (cCtx) {
      cCtx.fillStyle = "#f8fafc";
      cCtx.fillRect(0, 0, 512, 512);
      for (let y = 0; y < 512; y += 2) {
        const alpha = (Math.random() * 0.035).toFixed(3);
        cCtx.fillStyle = `rgba(0,0,0,${alpha})`;
        cCtx.fillRect(0, y, 512, 1);
      }
    }
    const chassisTexture = new THREE.CanvasTexture(chassisCanvas);
    chassisTexture.wrapS = THREE.RepeatWrapping;
    chassisTexture.wrapT = THREE.RepeatWrapping;

    // 3. Trackpad Frosted Satin Glass Sheen Texture
    const trackpadCanvas = document.createElement("canvas");
    trackpadCanvas.width = 256;
    trackpadCanvas.height = 256;
    const tCtx = trackpadCanvas.getContext("2d");
    if (tCtx) {
      tCtx.fillStyle = "#f1f5f9";
      tCtx.fillRect(0, 0, 256, 256);
      const grad = tCtx.createLinearGradient(0, 0, 256, 256);
      grad.addColorStop(0, "rgba(255,255,255,0.45)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.1)");
      grad.addColorStop(1, "rgba(240,240,248,0.35)");
      tCtx.fillStyle = grad;
      tCtx.fillRect(0, 0, 256, 256);
      // Soft chamfer edge
      tCtx.strokeStyle = "rgba(255,255,255,0.8)";
      tCtx.lineWidth = 4;
      tCtx.strokeRect(2, 2, 252, 252);
    }
    const trackpadTexture = new THREE.CanvasTexture(trackpadCanvas);

    // 5. CERAMIC WHITE & 24K GOLD MATERIALS WITH TACTILE TEXTURE
    // Pristine Apple Ceramic White Unibody
    const ceramicWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      map: chassisTexture,
      roughness: 0.22,
      metalness: 0.12,
    });

    // 24K Electroplated Gold Border & Chamfers (Pure luxury gold lining!)
    const luxuryGoldLiningMat = new THREE.MeshStandardMaterial({
      color: 0xe6b94d,
      emissive: 0x5a420b,
      emissiveIntensity: 0.2,
      roughness: 0.12,
      metalness: 0.98,
    });

    const glowingGoldEmblemMat = new THREE.MeshStandardMaterial({
      color: 0xffe082,
      emissive: 0xffb300,
      emissiveIntensity: 2.0,
      roughness: 0.1,
      metalness: 0.95,
    });

    const cameraLensMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.1,
      metalness: 0.9,
    });

    // Tactile PBT Keycap Material with Micro-Texture
    const keycapWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: keycapTexture,
      roughness: 0.45,
      metalness: 0.1,
    });

    const keycapGoldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xe6b94d,
      roughness: 0.2,
      metalness: 0.92,
    });

    const trackpadWhiteGlassMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      map: trackpadTexture,
      roughness: 0.18,
      metalness: 0.25,
    });

    const rubberPadsMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      metalness: 0.1,
    });

    // 6. Synchronized 3D Hierarchy
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    const cssWorkstationGroup = new THREE.Group();
    cssScene.add(cssWorkstationGroup);

    // ============================================================
    // A. BIG 34"+ CERAMIC WHITE DISPLAY WITH 24K GOLD BORDER
    // ============================================================
    const displayGroup = new THREE.Group();
    displayGroup.position.set(0, 0.85, 0);
    workstationGroup.add(displayGroup);

    // Large Pristine Ceramic White Unibody (4.48 x 3.02 x 0.13) - BIGGER & GRANDER!
    const unibodyGeo = new THREE.BoxGeometry(4.48, 3.02, 0.13);
    const unibody = new THREE.Mesh(unibodyGeo, ceramicWhiteMat);
    unibody.castShadow = true;
    unibody.receiveShadow = true;
    displayGroup.add(unibody);

    // 24K GOLD PERIMETER BORDER LINING (Crisp golden border around the entire white chassis!)
    const goldLiningOuterGeo = new THREE.BoxGeometry(4.51, 3.05, 0.02);
    const goldLiningOuter = new THREE.Mesh(goldLiningOuterGeo, luxuryGoldLiningMat);
    goldLiningOuter.position.set(0, 0, 0.06);
    displayGroup.add(goldLiningOuter);

    // Micro FaceTime Camera Dot at top center bezel
    const cameraDotGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.015, 16);
    cameraDotGeo.rotateX(Math.PI / 2);
    const cameraDot = new THREE.Mesh(cameraDotGeo, cameraLensMat);
    cameraDot.position.set(0, 1.46, 0.075);
    displayGroup.add(cameraDot);

    // Camera Green Indicator LED
    const ledDotGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.015, 8);
    ledDotGeo.rotateX(Math.PI / 2);
    const ledDotMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const ledDot = new THREE.Mesh(ledDotGeo, ledDotMat);
    ledDot.position.set(0.045, 1.46, 0.075);
    displayGroup.add(ledDot);

    // ILLUMINATED GOLDEN "ON" LOGO EMBLEM (Bottom Chin)
    const logoBadgeGeo = new THREE.BoxGeometry(0.6, 0.075, 0.02);
    const logoBadge = new THREE.Mesh(logoBadgeGeo, glowingGoldEmblemMat);
    logoBadge.position.set(0, -1.44, 0.075);
    displayGroup.add(logoBadge);
    logoMeshRef.current = logoBadge;

    // Rear Mirror-Polished Gold Apple / YogX Emblem
    const rearEmblemGeo = new THREE.BoxGeometry(0.48, 0.48, 0.01);
    const rearEmblem = new THREE.Mesh(rearEmblemGeo, luxuryGoldLiningMat);
    rearEmblem.position.set(0, 0.2, -0.07);
    displayGroup.add(rearEmblem);

    // Rear CNC Circular Cooling Grille in Gold & White
    const rearGrilleGroup = new THREE.Group();
    rearGrilleGroup.position.set(0, 0.65, -0.07);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 22; c++) {
        const holeGeo = new THREE.CircleGeometry(0.018, 12);
        const holeMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
        const hole = new THREE.Mesh(holeGeo, holeMat);
        hole.position.set(-1.75 + c * 0.165, -0.2 + r * 0.14, 0);
        hole.rotation.y = Math.PI;
        rearGrilleGroup.add(hole);
      }
    }
    displayGroup.add(rearGrilleGroup);

    // ============================================================
    // B. EMBEDDED RETINA INTERACTIVE OS (100% CRYSTAL CLEAR - NO BLUR OVERLAYS)
    // ============================================================
    screenDom.style.pointerEvents = "auto";
    const cssScreenObj = new CSS3DObject(screenDom);
    // Positioned flush with crystal clear clarity
    cssScreenObj.position.set(0, 0.85 - 0.005, 0.075);
    cssScreenObj.scale.set(0.00548, 0.00538, 0.00548);
    cssWorkstationGroup.add(cssScreenObj);

    // ============================================================
    // C. CERAMIC WHITE CANTILEVERED STAND WITH 24K GOLD TRIM
    // ============================================================
    const standGroup = new THREE.Group();
    workstationGroup.add(standGroup);

    // Stand Hinge Mechanism with 24K Gold Cylinder
    const hingeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.46, 24);
    hingeGeo.rotateZ(Math.PI / 2);
    const hinge = new THREE.Mesh(hingeGeo, luxuryGoldLiningMat);
    hinge.position.set(0, 0.85, -0.13);
    standGroup.add(hinge);

    // Ceramic White Stand Arm
    const standArmGeo = new THREE.BoxGeometry(0.44, 1.8, 0.085);
    const standArm = new THREE.Mesh(standArmGeo, ceramicWhiteMat);
    standArm.position.set(0, -0.05, -0.38);
    standArm.rotation.x = THREE.MathUtils.degToRad(-18);
    standArm.castShadow = true;
    standGroup.add(standArm);

    // Stand Arm Gold Edge Chamfer Lining
    const standArmGoldGeo = new THREE.BoxGeometry(0.455, 1.81, 0.01);
    const standArmGold = new THREE.Mesh(standArmGoldGeo, luxuryGoldLiningMat);
    standArmGold.position.set(0, -0.05, -0.33);
    standArmGold.rotation.x = THREE.MathUtils.degToRad(-18);
    standGroup.add(standArmGold);

    // Cable Pass-Through Port with 24K Gold Rim
    const cableHoleGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.11, 20);
    cableHoleGeo.rotateX(Math.PI / 2);
    const cableHole = new THREE.Mesh(cableHoleGeo, luxuryGoldLiningMat);
    cableHole.position.set(0, -0.2, -0.34);
    standGroup.add(cableHole);

    // Ceramic White Base Plate (2.2 x 0.045 x 1.6)
    const basePlateGeo = new THREE.BoxGeometry(2.2, 0.045, 1.6);
    const basePlate = new THREE.Mesh(basePlateGeo, ceramicWhiteMat);
    basePlate.position.set(0, -0.84, -0.12);
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    standGroup.add(basePlate);

    // Base Plate 24K Gold Perimeter Border
    const basePlateRimGeo = new THREE.BoxGeometry(2.23, 0.015, 1.63);
    const basePlateRim = new THREE.Mesh(basePlateRimGeo, luxuryGoldLiningMat);
    basePlateRim.position.set(0, -0.83, -0.12);
    standGroup.add(basePlateRim);

    // Rubber Desk Pads
    [[-0.95, -0.7], [0.95, -0.7], [-0.95, 0.5], [0.95, 0.5]].forEach(([px, pz]) => {
      const padGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16);
      const pad = new THREE.Mesh(padGeo, rubberPadsMat);
      pad.position.set(px, -0.86, pz - 0.12);
      standGroup.add(pad);
    });

    // ============================================================
    // D. CERAMIC WHITE & GOLD KEYBOARD DECK + MAGIC TRACKPAD
    // ============================================================
    const deskAccessoriesGroup = new THREE.Group();
    deskAccessoriesGroup.position.set(0, -0.82, 1.3);
    workstationGroup.add(deskAccessoriesGroup);

    // Ceramic White Keyboard Chassis
    const keyboardChassisGeo = new THREE.BoxGeometry(2.45, 0.035, 0.9);
    const keyboardChassis = new THREE.Mesh(keyboardChassisGeo, ceramicWhiteMat);
    keyboardChassis.position.set(-0.42, 0, 0);
    keyboardChassis.rotation.x = THREE.MathUtils.degToRad(4);
    keyboardChassis.castShadow = true;
    deskAccessoriesGroup.add(keyboardChassis);

    // Keyboard 24K Gold Rim
    const kbGoldRimGeo = new THREE.BoxGeometry(2.47, 0.012, 0.92);
    const kbGoldRim = new THREE.Mesh(kbGoldRimGeo, luxuryGoldLiningMat);
    kbGoldRim.position.set(-0.42, -0.005, 0);
    kbGoldRim.rotation.x = THREE.MathUtils.degToRad(4);
    deskAccessoriesGroup.add(kbGoldRim);

    // Precision White & Gold Keycaps
    const kbRows = [
      { count: 12, width: 0.14, depth: 0.095, z: -0.3, y: 0.026 },
      { count: 12, width: 0.14, depth: 0.105, z: -0.15, y: 0.027 },
      { count: 11, width: 0.15, depth: 0.105, z: 0.0, y: 0.028 },
      { count: 10, width: 0.15, depth: 0.105, z: 0.15, y: 0.029 },
    ];

    kbRows.forEach((row, rIdx) => {
      const totalW = row.count * (row.width + 0.035);
      const startX = -0.42 - totalW / 2 + row.width / 2;

      for (let i = 0; i < row.count; i++) {
        const isGoldAccent = (rIdx === 0 && i === 0) || (rIdx === 2 && i === row.count - 1);
        const kGeo = new THREE.BoxGeometry(row.width, 0.02, row.depth);
        const kMesh = new THREE.Mesh(kGeo, isGoldAccent ? keycapGoldAccentMat : keycapWhiteMat);
        kMesh.position.set(startX + i * (row.width + 0.035), row.y, row.z);
        kMesh.rotation.x = THREE.MathUtils.degToRad(4);
        kMesh.castShadow = true;
        deskAccessoriesGroup.add(kMesh);
      }
    });

    // Spacebar Key in Gold
    const spaceGeo = new THREE.BoxGeometry(0.9, 0.02, 0.105);
    const spaceMesh = new THREE.Mesh(spaceGeo, keycapGoldAccentMat);
    spaceMesh.position.set(-0.42, 0.03, 0.3);
    spaceMesh.rotation.x = THREE.MathUtils.degToRad(4);
    deskAccessoriesGroup.add(spaceMesh);

    // Frosted White Glass Magic Trackpad with 24K Gold Rim
    const trackpadGeo = new THREE.BoxGeometry(1.08, 0.035, 0.9);
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadWhiteGlassMat);
    trackpad.position.set(1.5, 0, 0);
    trackpad.rotation.x = THREE.MathUtils.degToRad(4);
    trackpad.castShadow = true;
    deskAccessoriesGroup.add(trackpad);

    // Trackpad Gold Chamfer Rim
    const trackpadGoldRimGeo = new THREE.BoxGeometry(1.1, 0.012, 0.92);
    const trackpadGoldRim = new THREE.Mesh(trackpadGoldRimGeo, luxuryGoldLiningMat);
    trackpadGoldRim.position.set(1.5, -0.005, 0);
    trackpadGoldRim.rotation.x = THREE.MathUtils.degToRad(4);
    deskAccessoriesGroup.add(trackpadGoldRim);

    // ============================================================
    // E. CLEAN 3D WORKSTATION (NO SMUDGY RECTANGULAR SHADOW PLANES)
    // ============================================================

    // 7. Ultra-Smooth Parallax & Drag Handlers
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(".terminal-interactive-area")) {
        return;
      }
      isDraggingRef.current = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerPosRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current) {
        const deltaX = (clientX - previousPointerPosRef.current.x) * 0.005;
        const deltaY = (clientY - previousPointerPosRef.current.y) * 0.005;
        targetRotationRef.current.y += deltaX;
        targetRotationRef.current.x = Math.max(-0.15, Math.min(0.18, targetRotationRef.current.x + deltaY));
        previousPointerPosRef.current = { x: clientX, y: clientY };
      } else {
        const rect = container.getBoundingClientRect();
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        targetRotationRef.current.y = normX * 0.25;
        targetRotationRef.current.x = 0.02 - normY * 0.12;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      webglRenderer.setSize(w, h);
      cssRenderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. 60FPS Silky Smooth Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.07;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.07;

      workstationGroup.rotation.x = currentRotationRef.current.x;
      workstationGroup.rotation.y = currentRotationRef.current.y;

      cssWorkstationGroup.rotation.x = currentRotationRef.current.x;
      cssWorkstationGroup.rotation.y = currentRotationRef.current.y;

      webglRenderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      if (cssRenderer.domElement && cssRenderer.domElement.parentNode) {
        cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);
      }
      webglRenderer.dispose();
    };
  }, [ambientThemeIndex]);

  const currentTheme = ambientThemes[ambientThemeIndex];

  return (
    <div className="relative w-full max-w-[880px] mx-auto flex flex-col items-center select-none font-sans">
      {/* 3D WORKSTATION CONTAINER (WebGL + Crystal Clear Embedded CSS3D) */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3.1] sm:aspect-[4/2.7] flex items-center justify-center overflow-visible"
      >
        {/* WebGL 3D Hardware Canvas */}
        <canvas ref={webglCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* The Live Interactive Studio OS DOM (100% Crystal Clear - No blur overlays!) */}
        <div style={{ display: "none" }}>
          <div
            ref={screenDomRef}
            className="terminal-interactive-area w-[800px] h-[540px] bg-[#0c1322] rounded-lg overflow-hidden border border-amber-400/40 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative select-text"
            style={{
              filter: isPoweredOn
                ? brightnessLevel !== 1.0 ? `brightness(${brightnessLevel})` : "none"
                : "brightness(0.05) contrast(0.3)",
              transition: "filter 0.3s ease",
            }}
          >
            {/* The Full Retro Terminal OS with Razor Sharp Typography */}
            <RetroTerminalOS
              activeTab={activeTab}
              onSelectTab={onSelectTab}
              onNavigateSection={onNavigateSection}
            />
          </div>
        </div>

        {/* 3D Drag & Rotate Hint Badge with Gold Trim */}
        <div className="absolute bottom-1.5 left-2 z-30 px-3.5 py-1 rounded-full bg-white/95 border border-amber-400/50 text-slate-800 text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md pointer-events-none shadow-lg">
          <Crown size={13} className="text-amber-500 animate-pulse" />
          <span className="font-bold">WHITE & GOLD ROYALE [3D ROTATE]</span>
        </div>
      </div>

      {/* SLEEK FLOATING LUXURY STUDIO CONTROLS (GOOD VIBES ONLY - NO BULKY BAR) */}
      <div className="w-full mt-3 flex items-center justify-center z-20 select-none">
        <div className="inline-flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-white/85 hover:bg-white/95 backdrop-blur-2xl border border-amber-400/50 shadow-[0_8px_30px_rgba(245,158,11,0.18)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.28)] transition-all duration-300">
          {/* 1. 3D Rotate Hint Pill */}
          <div className="px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-300/60 text-slate-800 text-[11px] font-mono flex items-center gap-1.5 font-bold">
            <Crown size={13} className="text-amber-500 animate-pulse" />
            <span>3D INTERACTIVE</span>
          </div>

          <div className="w-[1px] h-5 bg-slate-200/80 hidden sm:block" />

          {/* 2. Aura Theme Switcher Button */}
          <button
            onClick={handleCycleAura}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-400/60 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title="Cycle Ambient Aura Lighting"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span className="hidden sm:inline text-slate-500 font-semibold">Aura:</span>
            <span className="text-amber-700 font-extrabold">{currentTheme.name.split("&")[0].trim()}</span>
          </button>

          {/* 3. HDR Luminance / Brightness Button */}
          <button
            onClick={handleBrightnessChange}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-400/60 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title="Adjust Retina Luminance"
          >
            <Sun size={13} className="text-amber-500" />
            <span>{Math.round(brightnessLevel * 100)}%</span>
          </button>

          {/* 4. Display Power / Sleep Toggle Button */}
          <button
            onClick={handlePowerToggle}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
              isPoweredOn
                ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 shadow-[0_4px_15px_rgba(245,158,11,0.4)]"
                : "bg-slate-200 hover:bg-slate-300 text-slate-600 border border-slate-300"
            }`}
            title="Toggle Studio Display Power"
          >
            <Power size={12} strokeWidth={2.5} />
            <span>{isPoweredOn ? "DISPLAY ON" : "SLEEP"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

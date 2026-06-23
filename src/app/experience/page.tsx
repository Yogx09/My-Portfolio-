"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { ArrowLeft } from "lucide-react";

export default function ExperiencePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Clean Minimalist White Scene ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); 
        scene.fog = new THREE.FogExp2(0xffffff, 0.02);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;
        camera.position.y = 0;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 100, 80); 
        pointLight.position.set(0, 0, -5); 
        camera.add(pointLight);
        scene.add(camera);

        const loopLength = 120;
        const curveFreq = Math.PI / 60; 
        const curveAmp = 8;
        const getCurveX = (z: number) => Math.sin(z * curveFreq) * curveAmp;

        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff, 
            roughness: 0.5, 
            metalness: 0.05,
        });

        const createWallSegment = () => {
            const group = new THREE.Group();
            
            const floorGeo = new THREE.PlaneGeometry(12, loopLength, 10, 60);
            floorGeo.rotateX(-Math.PI / 2);
            floorGeo.translate(0, -3.5, 0);
            group.add(new THREE.Mesh(floorGeo, wallMaterial));

            group.children.forEach(mesh => {
                const geo = (mesh as THREE.Mesh).geometry;
                const pos = geo.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const localZ = pos.getZ(i);
                    pos.setX(i, pos.getX(i) + getCurveX(localZ));
                }
                geo.computeVertexNormals();
            });
            return group;
        };

        const wallSegments: THREE.Group[] = [];
        for (let i = 0; i < 3; i++) {
            const seg = createWallSegment();
            seg.position.z = -i * loopLength;
            scene.add(seg);
            wallSegments.push(seg);
        }

        // --- Floating 3D Theme Icons ---
        const sections = [
            { title: "PROJECTS", id: "PROJECTS", route: "/projects", desc: "View my latest work" },
            { title: "PERSONAL DATA", id: "ABOUT", route: "/about", desc: "Identity & background" },
            { title: "SKILLS", id: "SKILLS", route: "/skills", desc: "Technical arsenal" },
            { title: "SYSTEM ARCHIVE", id: "SYSTEM", route: "/system", desc: "Core architecture" },
        ];
        
        const frameCount = sections.length;
        const spacing = loopLength / frameCount;

        const themeObjects: { group: THREE.Group, baseZ: number, isLeft: boolean }[] = [];

        for (let i = 0; i < frameCount; i++) {
            const group = new THREE.Group();
            group.userData.targetScale = 1.0; 
            
            const sec = sections[i];

            // 1. Text Canvas (Floating below the 3D Theme)
            const canvas = document.createElement("canvas");
            canvas.width = 1024;
            canvas.height = 512;
            const ctx = canvas.getContext("2d");
            const tex = new THREE.CanvasTexture(canvas);

            const drawCanvas = (isHovered: boolean) => {
                if (!ctx) return;
                ctx.clearRect(0, 0, 1024, 512);
                
                ctx.fillStyle = isHovered ? "#06b6d4" : "rgba(255, 255, 255, 0.90)";
                ctx.fillRect(0, 0, 1024, 512);
                
                ctx.strokeStyle = isHovered ? "rgba(255, 255, 255, 0.5)" : "rgba(15, 23, 42, 0.05)";
                ctx.lineWidth = 4;
                ctx.strokeRect(40, 40, 944, 432);

                const primaryColor = isHovered ? "#ffffff" : "#0f172a";
                const descColor = isHovered ? "rgba(255,255,255,0.8)" : "#64748b";

                ctx.fillStyle = primaryColor;
                ctx.font = "900 72px 'Inter', system-ui, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(sec.title, 512, 240);
                
                ctx.fillStyle = descColor;
                ctx.font = "400 48px 'Inter', system-ui, sans-serif";
                ctx.fillText(sec.desc, 512, 340);

                tex.needsUpdate = true;
            };
            
            drawCanvas(false);

            const contentGeo = new THREE.PlaneGeometry(3.5, 1.75); 
            const contentMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
            const content = new THREE.Mesh(contentGeo, contentMat);
            content.position.y = -2.0; 
            group.add(content);
            
            group.userData.drawCanvas = drawCanvas;

            // 2. Massive 3D Theme Sculpture
            let themeGeo;
            if (sec.id === "PROJECTS") themeGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
            else if (sec.id === "ABOUT") themeGeo = new THREE.SphereGeometry(1.2, 32, 32);
            else if (sec.id === "SKILLS") themeGeo = new THREE.OctahedronGeometry(1.4, 0);
            else themeGeo = new THREE.TorusKnotGeometry(1.0, 0.3, 100, 16);

            const themeMat = new THREE.MeshPhysicalMaterial({ 
                color: 0xffffff, 
                metalness: 0.1,
                roughness: 0.1,
                transmission: 0.9, // Premium glass effect
                transparent: true,
                opacity: 1
            });
            const themeMesh = new THREE.Mesh(themeGeo, themeMat);
            themeMesh.position.y = 1.0; 
            themeMesh.name = "themeIcon";
            
            // Wireframe inner edges
            const edgeGeo = new THREE.EdgesGeometry(themeGeo);
            const edgeMat = new THREE.LineBasicMaterial({ color: 0xcbd5e1, linewidth: 2 });
            const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
            themeMesh.add(edgeLines);

            themeMesh.userData = { 
                edgeLines, 
                themeMat, 
                baseRotSpeed: { x: 0.005, y: 0.01 }, 
                targetRotSpeed: { x: 0.005, y: 0.01 },
                currentRotSpeedX: 0.005,
                currentRotSpeedY: 0.01
            };
            group.add(themeMesh);

            // 3. Invisible Hitbox covering everything
            const hitBoxGeo = new THREE.BoxGeometry(4, 6, 2);
            const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
            const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
            hitBox.position.y = 0;
            hitBox.userData = { isThemeHitBox: true, parentGroup: group, sec };
            group.add(hitBox);

            const isLeft = i % 2 === 0;
            const baseZ = -i * spacing;
            
            themeObjects.push({ group, baseZ, isLeft });
            scene.add(group);
        }

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        const color = new THREE.Color();

        for(let i = 0; i < particlesCount; i++) {
            const z = (Math.random() - 0.5) * 100 - 20;
            const curveX = getCurveX(z);
            posArray[i*3] = curveX + (Math.random() - 0.5) * 12; 
            posArray[i*3+1] = (Math.random() - 0.5) * 20; 
            posArray[i*3+2] = z; 
            
            color.setHSL(0, 0, 0.7 + Math.random() * 0.3); 
            color.toArray(colorArray, i * 3);
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.NormalBlending
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        setLoading(false);

        // Interaction State
        let targetZ = 8;
        let mouseX = 0;
        let isEntering = false;
        let activeThemeGroup: THREE.Group | null = null;
        let hoveredTheme: THREE.Object3D | null = null;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleWheel = (e: WheelEvent) => {
            if (isEntering) return;
            targetZ += e.deltaY * 0.02; 
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isEntering) return;
            mouseX = -((e.clientX / window.innerWidth) * 2 - 1); 
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        // --- Mobile Touch Support ---
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            if (isEntering) return;
            touchStartY = e.touches[0].clientY;
            
            // Update mouse coordinates for tap interactions
            mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isEntering) return;
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            targetZ += deltaY * 0.06; // Adjust swipe sensitivity
            touchStartY = touchY;
        };

        const handleMouseClick = (e: MouseEvent) => {
            if (isEntering) return;
            
            // On mobile, the click event provides clientX/Y, but we fall back to touch coords if needed
            const clientX = e.clientX ?? (e as any).touches?.[0]?.clientX;
            const clientY = e.clientY ?? (e as any).touches?.[0]?.clientY;
            
            if (clientX !== undefined && clientY !== undefined) {
                mouse.x = (clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(clientY / window.innerHeight) * 2 + 1;
            }
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            
            for (let i = 0; i < intersects.length; i++) {
                const obj = intersects[i].object;
                if (obj.userData.isThemeHitBox) {
                    isEntering = true;
                    activeThemeGroup = obj.userData.parentGroup;
                    if (hoveredTheme) document.body.style.cursor = "default";
                    break;
                }
            }
        };

        const handleClose = () => {
            isEntering = false;
            const btn = document.getElementById("close-button");
            const msg = document.getElementById("construction-message");
            if (btn) btn.style.display = "none";
            if (msg) msg.style.display = "none";
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("click", handleMouseClick);
        const closeBtn = document.getElementById("close-button");
        if (closeBtn) closeBtn.addEventListener("click", handleClose);

        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", resize);

        const targetQ = new THREE.Quaternion();
        const dummy = new THREE.Object3D();

        // Animation Loop
        let rafId: number;
        const animate = () => {
            rafId = requestAnimationFrame(animate);

            // Raycast for hover effects & Pop Animations
            if (!isEntering) {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(scene.children, true);
                
                let foundHover = null;
                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object.userData.isThemeHitBox) {
                        foundHover = intersects[i].object;
                        break;
                    }
                }
                
                if (foundHover !== hoveredTheme) {
                    if (hoveredTheme) {
                        const icon = hoveredTheme.userData.parentGroup.getObjectByName("themeIcon");
                        if (icon) {
                            icon.userData.edgeLines.material.color.setHex(0xcbd5e1); 
                            icon.userData.themeMat.color.setHex(0xffffff); 
                            icon.userData.targetRotSpeed = icon.userData.baseRotSpeed;
                        }
                        hoveredTheme.userData.parentGroup.userData.targetScale = 1.0;
                        if (hoveredTheme.userData.parentGroup.userData.drawCanvas) hoveredTheme.userData.parentGroup.userData.drawCanvas(false);
                        document.body.style.cursor = "default";
                    }
                    if (foundHover) {
                        const icon = foundHover.userData.parentGroup.getObjectByName("themeIcon");
                        if (icon) {
                            icon.userData.edgeLines.material.color.setHex(0x06b6d4); // Bright Cyan
                            icon.userData.themeMat.color.setHex(0xe0f2fe); // Blue tinted glass
                            icon.userData.targetRotSpeed = { x: 0.05, y: 0.1 }; // Fast Spin!
                        }
                        foundHover.userData.parentGroup.userData.targetScale = 1.15; 
                        if (foundHover.userData.parentGroup.userData.drawCanvas) foundHover.userData.parentGroup.userData.drawCanvas(true);
                        document.body.style.cursor = "pointer";
                    }
                    hoveredTheme = foundHover;
                }
            }

            if (isEntering && activeThemeGroup) {
                const themeRot = activeThemeGroup.rotation.y;
                
                // Fly physically INTO the center of the massive 3D Theme Glass Shape!
                const roomPos = activeThemeGroup.position.clone();
                const targetCameraPos = new THREE.Vector3(
                    roomPos.x, 
                    1.0, // Center height of the icon
                    roomPos.z
                );

                camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraPos.z, 0.07);
                camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraPos.x, 0.025);
                camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraPos.y, 0.05);
                
                targetQ.setFromEuler(new THREE.Euler(0, themeRot, 0));
                camera.quaternion.slerp(targetQ, 0.05);

                // Show close button when we arrive inside the glass sculpture
                if (camera.position.distanceTo(targetCameraPos) < 1.0) {
                    const btn = document.getElementById("close-button");
                    const msg = document.getElementById("construction-message");
                    if (btn && btn.style.display === "none") {
                        btn.style.display = "flex";
                        if (msg) msg.style.display = "flex";
                        // Future: Here we could automatically trigger router.push(activeThemeGroup.userData.sec.route)
                    }
                }

            } else {
                // Ensure camera returns to floor level
                camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05);
                
                camera.position.z += (targetZ - camera.position.z) * 0.05;
                const targetX = getCurveX(camera.position.z) + mouseX * 3;
                camera.position.x += (targetX - camera.position.x) * 0.05;
                
                const lookAheadZ = camera.position.z - 10;
                dummy.position.copy(camera.position);
                dummy.lookAt(getCurveX(lookAheadZ) + mouseX * 5, 0, lookAheadZ);
                camera.quaternion.slerp(dummy.quaternion, 0.1);

                wallSegments.forEach((seg) => {
                    let diffZ = seg.position.z - camera.position.z;
                    if (diffZ > loopLength * 1.5) seg.position.z -= loopLength * 3;
                    if (diffZ < -loopLength * 1.5) seg.position.z += loopLength * 3;
                });

                themeObjects.forEach((theme) => {
                    const currentScale = theme.group.scale.x;
                    const targetS = theme.group.userData.targetScale;
                    const nextScale = THREE.MathUtils.lerp(currentScale, targetS, 0.15);
                    theme.group.scale.set(nextScale, nextScale, nextScale);

                    // Dynamic 3D Theme Rotation
                    const icon = theme.group.getObjectByName("themeIcon") as THREE.Mesh;
                    if (icon) {
                        icon.userData.currentRotSpeedX = THREE.MathUtils.lerp(icon.userData.currentRotSpeedX, icon.userData.targetRotSpeed.x, 0.05);
                        icon.userData.currentRotSpeedY = THREE.MathUtils.lerp(icon.userData.currentRotSpeedY, icon.userData.targetRotSpeed.y, 0.05);
                        icon.rotation.x += icon.userData.currentRotSpeedX;
                        icon.rotation.y += icon.userData.currentRotSpeedY;
                    }

                    let rawDiff = (theme.baseZ - camera.position.z);
                    let diffZ = ((rawDiff % loopLength) + loopLength) % loopLength;
                    if (diffZ > loopLength / 2) diffZ -= loopLength;
                    
                    const currentZ = camera.position.z + diffZ;
                    theme.group.position.z = currentZ;
                    
                    const curveX = getCurveX(currentZ);
                    theme.group.position.x = (theme.isLeft ? -6.4 : 6.4) + curveX; 

                    const tiltAngle = Math.PI / 5; 
                    const baseRot = theme.isLeft ? (Math.PI / 2 + tiltAngle) : (-Math.PI / 2 - tiltAngle);
                    
                    const tangentAngle = Math.atan(curveAmp * curveFreq * Math.cos(curveFreq * currentZ));
                    theme.group.rotation.y = baseRot - tangentAngle;
                });
            }

            const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
            for(let i=2; i<particlesCount*3; i+=3) {
                positions[i] += 0.2; 
                if(positions[i] > camera.position.z + 10) {
                    positions[i] -= 100; 
                    positions[i-2] = getCurveX(positions[i]) + (Math.random() - 0.5) * 12;
                    positions[i-1] = (Math.random() - 0.5) * 20;
                }
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleMouseClick);
            if (closeBtn) closeBtn.removeEventListener("click", handleClose);
            cancelAnimationFrame(rafId);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            scene.clear();
            document.body.style.cursor = "default";
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-white overflow-hidden select-none font-sans">
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
                    <div className="animate-pulse text-slate-300 tracking-[0.3em] text-xs font-medium">INITIALIZING...</div>
                </div>
            )}
            
            <div ref={containerRef} className="absolute inset-0 z-0"></div>

            <div className="absolute top-0 left-0 w-full p-8 z-20 pointer-events-none flex justify-between items-start">
                <Link href="/" className="pointer-events-auto flex items-center gap-2 group">
                    <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform group-hover:text-slate-800" />
                    <span className="text-xs font-medium tracking-widest text-slate-400 group-hover:text-slate-800 transition-colors uppercase">Return</span>
                </Link>

                <div className="text-xs font-semibold tracking-[0.2em] text-slate-300">
                    EXPERIENCE ARCHIVES
                </div>
            </div>

            <div className="absolute bottom-12 w-full text-center z-20 pointer-events-none flex justify-center">
                <div className="text-[10px] tracking-[0.3em] text-slate-400 font-medium animate-pulse">
                    SCROLL TO EXPLORE
                </div>
            </div>

            <div id="construction-message" style={{ display: 'none' }} className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-40 pointer-events-none animate-in slide-in-from-bottom-8 fade-in duration-700">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-8 py-6 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
                    <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                        <div className="w-3 h-3 bg-cyan-500 rounded-full absolute"></div>
                    </div>
                    <h2 className="text-slate-900 font-black tracking-[0.15em] mb-2 text-sm uppercase">SECTOR UNDER CONSTRUCTION</h2>
                    <p className="text-slate-500 text-xs tracking-wide max-w-xs leading-relaxed">The internal pathways for this section are currently being synthesized. Please check back later.</p>
                </div>
            </div>

            <div id="close-button" style={{ display: 'none' }} className="absolute bottom-12 w-full flex justify-center z-50 pointer-events-auto animate-in fade-in zoom-in duration-500">
                <button className="px-10 py-4 rounded-full bg-slate-900 text-white text-xs font-bold tracking-[0.2em] hover:bg-cyan-600 hover:scale-105 transition-all shadow-2xl border border-slate-700">
                    CLOSE RECORD
                </button>
            </div>
        </div>
    );
}

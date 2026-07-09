"use client";

import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=600&auto=format&fit=crop",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full flex justify-center py-10 mt-8 relative z-20">
      <div className="relative grid grid-cols-1 items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full max-w-7xl mx-auto">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-6xl px-5">
              <div className="flex w-full items-center justify-center gap-2">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "20rem", // Adjusted height slightly for better fit in hero
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <img
                      className="w-full h-full object-cover filter contrast-125 saturate-150"
                      src={src}
                      alt={`Project Highlight ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;

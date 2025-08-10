import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full p-8 flex justify-between z-50">
      <div className="brand text-2xl font-md text-white">thirtysixstudios</div>
      <div className="links flex gap-10 text-white">
        {[
          "What we do",
          "Who we are",
          "How we give back",
          "Talk to us",
        ].map((link, index) => (
          <a
            key={index}
            href={`#${link.toLowerCase()}`}
            className="text-md hover:text-gray-300"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}

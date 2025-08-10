import { useEffect, useRef, useState } from "react";

export default function CustomCursor({ visible }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);

  // Track latest mouse instantly
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      setCursorPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15, // smoothness
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePos]);

  // 🔹 Fix ghost cursor: initialize position when visible becomes true
  useEffect(() => {
    if (visible) {
      const { clientX, clientY } = window._lastMouse || { clientX: 0, clientY: 0 };
      setMousePos({ x: clientX, y: clientY });
      setCursorPos({ x: clientX, y: clientY });
    }
  }, [visible]);

  // 🔹 Always store last mouse globally
  useEffect(() => {
    const storeMouse = (e) => {
      window._lastMouse = { clientX: e.clientX, clientY: e.clientY };
    };
    window.addEventListener("mousemove", storeMouse);
    return () => window.removeEventListener("mousemove", storeMouse);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: `${cursorPos.x + 15}px`,
        top: `${cursorPos.y - 20}px`,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
      ></div>
    </div>
  );
}

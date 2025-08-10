import { useEffect, useState, useRef } from "react";
import "./index.css";
import Canvas from "./Components/Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "./Components/NavBar";
import CustomCursor from "./Components/CustomCursor";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isSpreading, setIsSpreading] = useState(false);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prev) => {
        if (!prev) {
          setIsSpreading(true);
          setShowCursor(false);

          // Wait until the span is actually in the DOM
          requestAnimationFrame(() => {
            gsap.set(growingSpan.current, {
              top: e.clientY - 10,
              left: e.clientX - 10,
              scale: 0,
            });

            gsap.to("body", {
              color: "#000",
              backgroundColor: "#fd2c2a",
              duration: 1.2,
              ease: "power2.inOut",
            });

            gsap.to(growingSpan.current, {
              scale: 1000,
              duration: 2,
              ease: "power2.inOut",
              onComplete: () => {
                setIsSpreading(false); // unmount after animation
              },
            });
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
          setShowCursor(true);
        }
        return !prev;
      });
    };
    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
  return (
    <>
      <CustomCursor visible={showCursor} />
      {isSpreading && (
        <span
          ref={growingSpan}
          className="growing fixed w-5 h-5 rounded-full bg-orange-500 pointer-events-none"
          style={{
            transform: "scale(0)",
            transformOrigin: "center",
          }}
        ></span>
      )}

      <div className="w-full min-h-screen relative ">
        {showCanvas &&
          data[0].map((canvasDets, index) => (
            <Canvas key={index} details={canvasDets} />
          ))}
        <div className="w-full h-screen text-white relative z-[1]">
          <Navbar />
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-3xl leading-[1.2] ml-10">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-md w-[80%] mt-10 font-normal ml-10">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10 ml-10">scroll</p>
            </div>
            <div className="w-full absolute bottom-0 left-0">
              <h1
                ref={headingref}
                className="text-[13rem] font-normal tracking-normal leading-none pl-5 "
              >
                Thirtysixstudio
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen text-white mt-32 px-10 relative ">
        {showCanvas &&
          data[1].map((canvasDets, index) => (
            <Canvas key={index} details={canvasDets} />
          ))}
        <div className="relative z-[1]">
          <h1 className="text-6xl tracking-tighter">About the brand</h1>
          <p className="text-3xl leading-8 font-light w-[85%] mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, culpa
            error consequuntur dolor ipsa numquam fugit, eum in id iste ut,
            voluptate vitae sed labore sunt incidunt atque nam! Ducimus!
          </p>
        </div>
      </div>
    </>
  );
}

export default App;

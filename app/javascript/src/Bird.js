import BIRDS from "vanta/dist/vanta.birds.min";
import React, { useState, useEffect, useRef } from "react";

const Bird = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          backgroundColor: 0xededed,
          backgroundAlpha: 0.4,
          color1: 0x6a5de0,
          color2: 0xa75bf0,
          quantity: 4,
          separation: 40.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div
      ref={myRef}
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden",
        margin: "0px",
        padding: "0px",
      }}
    >
      {children}
    </div>
  );
};

export default Bird;

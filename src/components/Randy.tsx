import { useState } from "react";
import RandyIcon from "../assets/randy.svg?react";
import RandyCloseIcon from "../assets/randyClose.svg?react";

export function Randy() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block"
    >
      {isHovered ? (
        <RandyCloseIcon className="inline h-24 w-24 mx-1" />
      ) : (
        <RandyIcon className="inline h-24 w-24 mx-1" />
      )}
    </div>
  );
}

import { useState } from "react";
import RandyIcon from "../assets/randy.svg?react";
import RandyCloseIcon from "../assets/randyClose.svg?react";
import RandyTalkIcon from "../assets/randyTalk.svg?react";

export function Randy() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="inline-block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <RandyCloseIcon className="inline h-24 w-24 mx-1" />
        ) : (
          <RandyIcon className="inline h-24 w-24 mx-1" />
        )}
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

const ConnectGoLogo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      <div className="bg-black rounded-lg p-2">
        <span className="text-xl font-bold text-white">
          Connect<span className="text-blue-400">Go</span>
        </span>
      </div>
    </div>
  );
};

export default ConnectGoLogo;

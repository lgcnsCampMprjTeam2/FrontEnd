import React from "react";

const BigButton = ({ text, onClick, fill }) => {
  const baseClasses =
    "flex justify-center items-center px-18 py-12 font-semibold text-sm rounded-[10px]";
  const fillClasses = fill
    ? "bg-primary text-white"
    : "bg-white text-primary border border-primary";

  return (
    <button className={`${baseClasses} ${fillClasses} cursor-pointer`} onClick={onClick}>
      {text}
    </button>
  );
};

export default BigButton;

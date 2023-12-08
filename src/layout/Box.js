import { useState } from "react";

const Box = ({ children }) => {
  const [isOpoen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpoen ? "-" : "+"}
      </button>

      {isOpoen && children}
    </div>
  );
};

export default Box
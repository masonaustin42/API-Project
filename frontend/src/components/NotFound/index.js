import { useState, useEffect } from "react";
import d20 from "./d20.png";
import "./NotFound.css";
function NotFound() {
  const [number, setNumber] = useState(20);

  useEffect(() => {
    const numberGen = setInterval(() => {
      setNumber(Math.ceil(Math.random() * 19));
    }, 30);

    setTimeout(() => {
      clearInterval(numberGen);
      setNumber(1);
    }, 2300);

    return () => {
      clearInterval(numberGen);
    };
  }, []);

  return (
    <>
      <h1 className="fade-in">Crit fail on your investigation check!</h1>
      <h2 className="fade-in" style={{ fontSize: "30px" }}>
        Error 404: Page Not Found
      </h2>
      <p className="back-home">
        <i class="fa-solid fa-arrow-left"></i> Back to Home
      </p>
      <div className="dice-tray">
        <div className="d20">
          <span>{number}</span>
          <img src={d20} />
        </div>
      </div>
    </>
  );
}

export default NotFound;

import { useEffect, useState } from "react";
import "./Banner.css";
import Banner1 from "../../assets/banner 1.png"
import Banner2 from "../../assets/banner 2.png"
import Banner3 from "../../assets/banner 3.png"

export default function Banner() {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = 3;

  // troca a cada 8s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a % total) + 1);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* radios controlados */}
      <input type="radio" name="banner" id="b1"
             checked={active === 1} onChange={() => setActive(1)} />
      <input type="radio" name="banner" id="b2"
             checked={active === 2} onChange={() => setActive(2)} />
      <input type="radio" name="banner" id="b3"
             checked={active === 3} onChange={() => setActive(3)} />

      {/* banner */}
      <div className="slides">
        <div className="slide">
          <img src={Banner1} alt="Banner 1" />
        </div>
        <div className="slide">
          <img src={Banner2} alt="Banner 2" />
        </div>
        <div className="slide">
          <img src={Banner3} alt="Banner 3" />
        </div>
      </div>

      {/* radio */}
      <div className="dots">
        <label htmlFor="b1" onClick={() => setActive(1)} />
        <label htmlFor="b2" onClick={() => setActive(2)} />
        <label htmlFor="b3" onClick={() => setActive(3)} />
      </div>
    </div>
  );
}

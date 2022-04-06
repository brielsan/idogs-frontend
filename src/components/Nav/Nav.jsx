import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./Nav.module.css";
import img from "../../ico/home2.png";
import img2 from "../../ico/dog2.png";
import mobile from "../../ico/menu.png";

export default function Nav() {
  const [burguerlist, setBurguerlist] = useState(false);

  return (
    <div className={s.root}>
      <div className={s.navpc}>
        <div className={s.links}>
          <Link style={{ textDecoration: "none" }} to="/home">
            <div className={s.link}>
              <img src={img} alt="" />
              Home
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/createrace">
            <div className={s.link3}>
              <img src={img2} alt="" />
              Create race
            </div>
          </Link>
        </div>
      </div>
      <div className={s.navMobile}>
        <img
          alt=""
          src={mobile}
          className={s.burguerlist}
          onClick={() =>
            burguerlist == true ? setBurguerlist(false) : setBurguerlist(true)
          }
        />
      </div>
      <div className={burguerlist ? s.containerMobile : s.off}>
        <Link style={{ textDecoration: "none" }} to="/home">
          <div className={s.link}>
            <img src={img} alt="" />
            Home
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/createrace">
          <div className={s.link3}>
            <img src={img2} alt="" />
            Create race
          </div>
        </Link>
      </div>
    </div>
  );
}

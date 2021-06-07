import React from "react";
import styles from "./Footer.module.css";
import {FaGithubSquare} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";

const Foooter = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <a href="https://github.com/BryanBorge" target="_blank"  rel="noreferrer">
          <FaGithubSquare  className={styles.icon} />
        </a>
        <a href="https://www.linkedin.com/in/bryan-borgesano/" target="_blank" rel="noreferrer" >
          <FaLinkedin  className={styles.icon} />
        </a>
      </div>
      <h4>
        COPYRIGHT©2021
        <span>
          <a href="https://bryanborge.github.io/portfolio/" rel="noreferrer" target="_blank">BRYAN BORGESANO</a>
        </span>
      </h4>
    </div>
  );
};

export default Foooter;

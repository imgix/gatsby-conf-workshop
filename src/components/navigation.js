import { Link } from "gatsby";
import React from "react";
import { navigation, navigationItem } from "./navigation.module.css";

const Navigation = () => (
  <nav role="navigation">
    <ul className={navigation}>
      <li className={navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={navigationItem}>
        <Link to="/blog/">Blog</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;

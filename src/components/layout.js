import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";

const Template = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      imgixImage(
        url: "https://assets.imgix.net/presskit/imgix-presskit.pdf?page=3&fm=png&w=200&dl=imgix_logo1_large.png"
      ) {
        fixed(width: 100) {
          ...GatsbyImgixFixed
        }
      }
    }
  `);

  return (
    <Container>
      <div style={{ padding: 20, paddingBottom: 0, textAlign: "center" }}>
        <Img fixed={data.imgixImage.fixed} alt="site logo" />
      </div>
      <Navigation />
      {children}
    </Container>
  );
};

export default Template;

import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { preview, previewTitle } from "./article-preview.module.css";

const ArticlePreview = ({ article }) => (
  <div className={preview}>
    <GatsbyImage alt="" image={article.heroImage.imgixImage.gatsbyImageData} />
    <h3 className={previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
);

export default ArticlePreview;

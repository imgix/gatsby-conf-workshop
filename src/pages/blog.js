import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import { Helmet } from "react-helmet";
import ArticlePreview from "../components/article-preview";
import Layout from "../components/layout";
import { hero } from "./blog.module.css";

const BlogIndex = (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
  const posts = get(props, "data.allContentfulBlogPost.edges");

  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />
        <div className={hero}>Blog</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;

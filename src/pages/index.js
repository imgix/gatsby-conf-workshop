import { buildFluidImageData } from "@imgix/gatsby";
import Img from "gatsby-image";
import get from "lodash/get";
import React from "react";
import { Helmet } from "react-helmet";
import ArticlePreview from "../components/article-preview";
import Hero from "../components/hero";
import Layout from "../components/layout";

const SICK_IMAGES = [
  "https://images.unsplash.com/photo-1501248457956-c25fd1de2930",
  "https://images.unsplash.com/photo-1541888050297-a615ca315e96",
  "https://images.unsplash.com/photo-1560829571-cb3e34498fb3",
];

const RootIndex = (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
  const posts = get(props, "data.allContentfulBlogPost.edges");
  const [author] = get(props, "data.allContentfulPerson.edges");

  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <Helmet title={siteTitle} />
        <Hero data={author.node} />
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
          <h2 className="section-headline">Recent photos</h2>
          <Img
            fluid={buildFluidImageData(
              SICK_IMAGES[Math.floor(Math.random() * SICK_IMAGES.length)],
              { fit: "crop", ar: "2:1", auto: "enhance" },
              { sizes: "(max-width: 1180px) calc(100vw - 90px), 1090px" }
            )}
            alt="dog"
          />
        </div>
      </div>
    </Layout>
  );
};

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
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
            imgixImage {
              fluid(
                imgixParams: { fit: "crop", crop: "entropy", auto: "enhance" }
                maxWidth: 350
                maxHeight: 196
              ) {
                ...GatsbyImgixFluid
                gatsbyImageData(layout: 'CONSTRAINED')
              }
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

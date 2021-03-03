import { buildFluidImageData } from "@imgix/gatsby";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import get from "lodash/get";
import React from "react";
import { Helmet } from "react-helmet";
import { P_IMAGES } from "../common/constants";
import { pickRandom } from "../common/utils";
import ArticlePreview from "../components/article-preview";
import Hero from "../components/hero";
import Layout from "../components/layout";

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
              pickRandom(P_IMAGES),
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
                imgixParams: {
                  fit: "crop"
                  crop: "faces,entropy"
                  auto: "enhance"
                  mark: "https://assets.imgix.net/presskit/imgix-presskit.pdf?page=2&fm=png&w=100&dl=imgix_logo1_large.png"
                  markW: 0.1
                }
                maxWidth: 350
                maxHeight: 196
              ) {
                ...GatsbyImgixFluid
              }
              gatsbyImageData(
                layout: CONSTRAINED
                imgixParams: {
                  fit: "crop"
                  crop: "faces,entropy"
                  auto: "enhance"
                  mark: "https://assets.imgix.net/presskit/imgix-presskit.pdf?page=4&fm=png&w=100&dl=imgix_logo1_large.png"
                  markW: 0.3
                }
                width: 350
                height: 196
              )
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

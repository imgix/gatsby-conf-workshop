require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { ImgixSourceType } = require("@imgix/gatsby");

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  siteMetadata: {
    title: "Gatsby Contentful starter",
  },
  pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: `@imgix/gatsby`,
      options: {
        // This is the domain of your imgix source, which can be created at
        // https://dashboard.imgix.com/.
        // Only "Web Proxy" imgix sources can be used for this configuration.
        domain: "sdk-proxy-test.imgix.net",

        // This is the source's secure token. Can be found under the "Security"
        // heading in your source's configuration page, and revealed by tapping
        // "Show Token".
        secureURLToken: process.env.PROXY_DEMO_TOKEN,

        // This configures the plugin to work in proxy mode.
        sourceType: ImgixSourceType.WebProxy,

        // These are some default imgix parameters to set for each image. It is
        // recommended to have at least this minimal configuration.
        defaultImgixParams: { auto: "format,compress" },

        // This configures which nodes to modify.
        fields: [
          {
            nodeType: "ContentfulAsset",
            fieldName: "imgixImage",
            getURL: (node) => `https:${node.file.url}`,
          },
        ],
      },
    },
  ],
};

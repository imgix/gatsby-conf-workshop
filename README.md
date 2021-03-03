![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

# @imgix/gatsby workshop example

## Installation

1. Clone this repo: `git clone https://github.com/imgix/gatsby-conf-workshop`
2. Install dependencies: `yarn`
3. Setup Contentful by running `yarn run setup` or add environment variables `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` corresponding to your Contentful account to a `.env.development` file

```
# Example .env.development file
CONTENTFUL_SPACE_ID='my-token'
CONTENTFUL_ACCESS_TOKEN='my-access-token'
```

4. Run `yarn run dev` and go to http://localhost:8000

### Getting started with Contentful

See our [official Contentful getting started guide](https://www.contentful.com/developers/docs/tutorials/general/get-started/).

### Set up of the needed content model and create a configuration file

This project comes with a Contentful setup command `npm run setup`.

This command will ask you for a space ID, and access tokens for the Contentful Management and Delivery API and then import the needed content model into the space you define and write a config file (`./.contentful.json`).

`npm run setup` automates that for you but if you want to do it yourself rename `.contentful.json.sample` to `.contentful.json` and add your configuration in this file.

## Crucial Commands

### `yarn run dev`

Run the project locally with live reload in development mode.

### `yarn run build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

### `yarn run serve`

Spin up a production-ready server with your blog. Don't forget to build your page beforehand.

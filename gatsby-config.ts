import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `YG Songs`,
    siteUrl: `https://www.youthgroupsongs.com`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: "src/images/icon.png",
        name: `Youth Group Songs`,
        short_name: `YG Songs`,
        start_url: `/`,
        background_color: `#2E2E2E`,
        theme_color: `#C9C9C9`,
        display: `standalone`,
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ['/'],
      }
    }
    
  ]
};

export default config;

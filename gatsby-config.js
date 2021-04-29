require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Quannt's Technical Blog`,
    // Default title of the page
    siteTitleAlt: `Quannt's Technical Blog`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Quannt's Technical Blog`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://quannt.xyz`,
    // Used for SEO
    siteDescription: `Quannt's Technical Blog`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.png`,
    // Twitter Handle
    author: `@quannt91`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        feedTitle: `Quannt's Technical Blog`,
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          }
        ],
        externalLinks: [
          {
            name: `SpeakerDeck`,
            url: 'http://speakerdeck.com/quannt/'
          },
          {
            name: `Github`,
            url: 'https://github.com/quannt'
          },
          {
            name: `Twitter`,
            url: `https://twitter.com/quannt91`,
          },
          {
            name: `CV`,
            url: `https://stackoverflow.com/story/quannt`,
          },
          {
            name: 'Linkedin',
            url: `https://www.linkedin.com/in/ngo-tung-quan/`
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Quannt's Technical Blog`,
        short_name: `quannt`,
        description: `Quannt's Technical Blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    {
      resolve: 'gatsby-source-notionso',
      options: {
        name: 'Blog',
        rootPageUrl:
          'https://www.notion.so/quannt/Blogs-37400af819bb4b12a06998dfab109fd8',
        debug: false,
      },
    }
  ].filter(Boolean),
}

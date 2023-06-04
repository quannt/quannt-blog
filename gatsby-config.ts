import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const config: GatsbyConfig = {
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
        author: `@quannt91` ,
    },
  trailingSlash: `never`,
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
            name: `Portfolio`,
            url: `https://quannt.notion.site/quannt-s-Portfolio-857f8a1d10e742d4aa70b9f381aa5889`,
          },
          {
            name: 'Linkedin',
            url: `https://www.linkedin.com/in/ngo-tung-quan`
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allPost },
            }: {
              query: { allPost: IAllPost; site: { siteMetadata: ISiteMetadata } }
            }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                }
              }),
            query: `{
  allPost(sort: {date: DESC}) {
    nodes {
      title
      date(formatString: "MMMM D, YYYY")
      excerpt
      slug
    }
  }
}`,
            output: `rss.xml`,
            title: `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog`,
          },
        ],
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config

interface IPostTag {
  name: string
  slug: string
}

interface IPost {
  slug: string
  title: string
  defer: boolean
  date: string
  excerpt: string
  contentFilePath: string
  html: string
  timeToRead: number
  wordCount: number
  tags: Array<IPostTag>
  banner: any
  description: string
  canonicalUrl: string
}

interface IAllPost {
  nodes: Array<IPost>
}

interface ISiteMetadata {
  siteTitle: string
  siteTitleAlt: string
  siteHeadline: string
  siteUrl: string
  siteDescription: string
  siteImage: string
  author: string
}
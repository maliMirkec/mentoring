// const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItRenderer = new markdownIt()
const markdownItAnchor = require('markdown-it-anchor')
const uslug = require('uslug')
const env = require('./site/_data/env');

module.exports = (eleventyConfig) => {
  eleventyConfig.setLibrary(
    'md',
    markdownIt({ html: true }).use(markdownItAnchor, { slugify: uslug })
  )

  eleventyConfig.addLiquidFilter('markdownify', (str) => markdownItRenderer.render(str.trim()))

  eleventyConfig.addLiquidFilter('markdownifyi', (str) => markdownItRenderer.renderInline(str.trim()))

  eleventyConfig.setBrowserSyncConfig({
    open: true,
  });

  eleventyConfig.addPassthroughCopy({"assets/dist": "."})

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- more -->"
  });

  return {
    dir: {
      input: 'site',
      output: 'public',
      layouts: '_layouts',
      data: '_data',
      htmlTemplateEngine: 'liquid',
      markdownTemplateEngine: 'liquid'
    }
  }
}

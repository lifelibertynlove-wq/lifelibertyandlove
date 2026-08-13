const fs = require("fs");

module.exports = function (eleventyConfig) {
  // Momento del build, para el <lastBuildDate> del feed RSS.
  // Asi Brevo/lectores ven que el feed se ha actualizado en cada publicacion.
  eleventyConfig.addGlobalData("buildTime", () => new Date());

  // Static assets
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy({ "src/css": "/css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "/js" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "/admin" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "/_redirects" });

  // Posts collection, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // Categories with counts
  eleventyConfig.addCollection("categories", (api) => {
    const map = {};
    api.getFilteredByGlob("src/posts/*.md").forEach((p) => {
      const c = p.data.category;
      if (c) map[c] = (map[c] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count, slug: slugify(name) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  function slugify(s) {
    return String(s)
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  eleventyConfig.addFilter("slugcat", slugify);

  eleventyConfig.addFilter("readableDate", (d) => {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content).replace(/<[^>]+>/g, " ").split(/\s+/).length;
    return Math.max(1, Math.round(words / 220));
  });

  eleventyConfig.addFilter("excerpt", (content, n) => {
    const text = String(content).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.slice(0, n || 180).replace(/\s\S*$/, "") + "\u2026";
  });

  eleventyConfig.addFilter("jsonify", (v) => JSON.stringify(v));

  eleventyConfig.addFilter("amp", (s) =>
    String(s).replace(/&amp;|&/g, '<span class="amp">&amp;</span>')
  );

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // Filtros para el feed RSS (envío automático por email vía MailerLite)
  eleventyConfig.addFilter("rssDate", (d) => {
    return new Date(d).toUTCString();
  });
  eleventyConfig.addFilter("striptags", (s) => String(s).replace(/<[^>]+>/g, ""));
  eleventyConfig.addFilter("cleanText", (s) =>
    String(s)
      .replace(/&nbsp;|&amp;nbsp;/g, " ")
      .replace(/\(READ HERE\)|\(read the story HERE\)/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim()
  );
  eleventyConfig.addFilter("truncate", (s, n) => {
    const str = String(s);
    if (str.length <= n) return str;
    return str.slice(0, n).replace(/\s\S*$/, "") + "\u2026";
  });

  eleventyConfig.addFilter("related", (posts, page, category, n) => {
    return posts
      .filter((p) => p.url !== page.url && p.data.category === category)
      .slice(0, n || 3);
  });

  const md = require("markdown-it")({ html: true, typographer: true });
  // Enlaces externos abren en pestaña nueva (para no perder el artículo que se lee).
  // Los enlaces internos del propio sitio se quedan en la misma pestaña.
  const defaultRender = md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) { return self.renderToken(tokens, idx, options); };
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const href = tokens[idx].attrGet("href") || "";
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    if (isExternal) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
    return defaultRender(tokens, idx, options, env, self);
  };
  eleventyConfig.setLibrary("md", md);

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

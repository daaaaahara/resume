module.exports = {
  stylesheet: "./pdf_configs/style.css",
  body_class: "markdown-body",
  marked_options: {
    headerIds: false,
    smartypants: true,
  },
  pdf_options: {
    "format": "A4",
    "margin": "15mm 20mm",
    "printBackground": true,
    "headerTemplate": "<section></section>",
    "footerTemplate": "<section>\n  <div>\n    <span class=\"pageNumber\"></span>\n    / <span class=\"totalPages\"></span>\n  </div>\n</section>"
  },
  stylesheet_encoding: "utf-8",
};

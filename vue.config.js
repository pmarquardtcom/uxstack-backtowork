module.exports = {
  filenameHashing: false,
  configureWebpack: {
    devtool: 'source-map',
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/index.scss";',
      },
    },
    extract: false,
  },
}

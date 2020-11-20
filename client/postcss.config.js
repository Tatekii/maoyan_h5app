module.exports = {
  "plugins": {
    // "postcss-import": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-write-svg": {
      uft8: false
    },
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 750,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: /(\/|\\)(node_modules)|(Admin)(\/|\\)/
    }
  }
}
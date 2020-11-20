module.exports = {
  publicPath: "/MOVI",
  devServer: {
    proxy: {
      "/usrapi": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/adapi": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api": {
        target: "http://m.maoyan.com/ajax",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
        // this.axios.get('/api/comingList?ci=)
      },
      // "/location": {
      //   target: "http://39.97.33.178/api/getLocation",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/location": "",
      //   },
      // },
      // https://m.maoyan.com/dianying/cities.json
      "/cityList": {
        target: "https://m.maoyan.com/dianying/cities.json",
        changeOrigin: true,
        pathRewrite: {
          "^/cityList": "",
        },
      },
      // 猫眼电影详情API
      // http://m.maoyan.com/asgard/movie/ID?&cityId=CITYID
      "/detail": {
        target: "http://m.maoyan.com/asgard/movie",
        changeOrigin: true,
        pathRewrite: {
          "^/detail": "",
        },
      },
    },
    // 解决控制台sockjs报错
    sockHost: " http://192.168.50.61:8080 ",
    disableHostCheck: true,
  },

  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
};

// "/api/comingSoon": {
//   target:
//     "https://m.maoyan.com/ajax/moreComingList?ci=20&token=&limit=10&movieIds=599133%2C1301775%2C1301632%2C1302043%2C1302296%2C1220983%2C1280015%2C1263104%2C1302042%2C1302313&optimus_uuid=10BE8DC0321F11EA962F4F92801616D859806B1EF4B940018A2A3A517E36840E&optimus_risk_level=71&optimus_code=10",
//   ws: true,
//   changOrigin: true
// },
// "/api/onScreen": {
//   target:
//     "https://m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=10BE8DC0321F11EA962F4F92801616D859806B1EF4B940018A2A3A517E36840E&optimus_risk_level=71&optimus_code=10",
//   ws: true,
//   changOrigin: true
// },
// "/api/mostWanted": {
//   target:
//     "https://m.maoyan.com/ajax/mostExpected?ci=20&limit=10&offset=0&token=&optimus_uuid=10BE8DC0321F11EA962F4F92801616D859806B1EF4B940018A2A3A517E36840E&optimus_risk_level=71&optimus_code=10",
//   ws: true,
//   changOrigin: true
// }

require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var ExtractTextPlugin = __webpack_require__(4);
var path = __webpack_require__(5);

module.exports = {
  /*
     ** Headers of the page
     */
  head: {
    title: 'H计划',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/plupload.full.min.js' }, { src: '/qiniu.min.js' }]
  },
  /*
     ** Global CSS
     */
  css: ['~assets/css/main.css', '~node_modules/iview/dist/styles/iview.css', '~assets/css/quill.bubble.css', '~assets/css/quill.core.css', '~assets/css/quill.snow.css', '~node_modules/video.js/dist/video-js.css', '~node_modules/vue-video-player/src/custom-theme.css'],
  /*
     ** Customize the progress-bar color
     */
  loading: { color: '#3B8070' },
  /*
     ** Build configuration
     */
  plugins: [{ src: '~plugins/iview.js', ssr: true }, { src: '~plugins/nuxt-quill-plugin.js', ssr: false }, { src: '~plugins/nuxt-video-player-plugin.js', ssr: false }],
  router: {
    mode: 'hash'
  },
  build: {
    /*
         ** Run ESLINT on save
         */
    // extend(config, ctx) {
    //     if (ctx.isClient) {
    //         config.module.rules.push({
    //             enforce: 'pre',
    //             test: /\.(js|vue)$/,
    //             loader: 'eslint-loader',
    //             exclude: /(node_modules)/
    //         })
    //     }
    // },
    // vendor: ['axios'],
    plugins: [new ExtractTextPlugin({
      filename: 'styles.css'
    })],
    extend: function extend(config, ctx) {
      var alias = config.resolve.alias;
      var newAlias = {
        '@src': path.resolve('src'),
        '@config': path.resolve('config'),
        '@static': path.resolve('static'),
        '@components': path.resolve('components'),
        '@pages': path.resolve('pages'),
        '@utils': path.resolve('utils')
      };
      config.resolve.alias = Object.assign({}, alias, newAlias);
      // console.log(config)
    }
  }
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_hyb_workspace_demos_hplan_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_hyb_workspace_demos_hplan_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_hyb_workspace_demos_hplan_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);


var start = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_hyb_workspace_demos_hplan_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
        var app, host, port, config, nuxt, builder;
        return __WEBPACK_IMPORTED_MODULE_0__Users_hyb_workspace_demos_hplan_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
                        host = process.env.HOST || '127.0.0.1';
                        port = process.env.PORT || 3000;

                        // Import and Set Nuxt.js options

                        config = __webpack_require__(0);

                        config.dev = !(app.env === 'production');

                        // Instantiate nuxt.js
                        nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

                        // Build in development

                        if (!config.dev) {
                            _context.next = 10;
                            break;
                        }

                        builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
                        _context.next = 10;
                        return builder.build();

                    case 10:

                        app.use(function (ctx) {
                            ctx.status = 200;
                            ctx.respond = false; // Mark request as handled for Koa
                            ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
                            nuxt.render(ctx.req, ctx.res);
                        });

                        app.listen(port, host);
                        console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function start() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map
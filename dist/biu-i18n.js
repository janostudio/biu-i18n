/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

exports.default = {
  install: function install(Vue, options) {
    var version = Number(Vue.version.split('.')[0]);
    if (version < 2) {
      throw new Error('vue-iframe-box supports vue version 2.0 and above. You are using Vue@' + version + '. Please upgrade to the latest version of Vue.');
    }
    window.langs = options.langs;
    Vue.prototype.$i18n = function (langsKey, isMessage) {
      var langs = options.langs;
      var results = '';
      var langsKeyType = isMessage ? '[object Object]' : Object.prototype.toString.call(langsKey);
      switch (langsKeyType) {
        case '[object String]':
          results = langs[langsKey] ? langs[langsKey] : langsKey;
          break;
        case '[object Array]':
          for (var i = 0; i < langsKey.length; i++) {
            results += langs[langsKey[i]] ? langs[langsKey[i]] : langsKey[i];
          }
          break;
        case '[object Object]':
          results = (0, _utils.langsObjectTransfer)(langsKey, langs);
          break;
        default:
          results = langsKey;
      }
      return results;
    };
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var langsObjectTransfer = exports.langsObjectTransfer = function langsObjectTransfer(val, langs) {
  var Msg = '';
  var originLangs = Object.prototype.toString.call(val) === '[object Array]' ? val : [val];

  var _loop = function _loop(i) {
    var num = 0;
    var langMsg = '';
    if (originLangs[i].hasOwnProperty('content')) {
      langMsg = langs[originLangs[i].content] ? langs[originLangs[i].content] : originLangs[i].content;
      langMsg = langMsg.replace(/{:param}/g, function () {
        num++;
        var lang = '';
        if (originLangs[i].params[num - 1]) lang = langs[originLangs[i].params[num - 1]] ? langs[originLangs[i].params[num - 1]] : originLangs[i].params[num - 1];
        return lang;
      });
    }
    Msg += i !== originLangs.length - 1 ? langMsg + '，' : langMsg;
  };

  for (var i = 0; i < originLangs.length; i++) {
    _loop(i);
  }
  return Msg;
};

/***/ })
/******/ ]);
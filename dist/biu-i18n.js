(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("biu-i18n", [], factory);
	else if(typeof exports === 'object')
		exports["biu-i18n"] = factory();
	else
		root["biu-i18n"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
exports.default = {
  install: function install(Vue, options) {
    var version = Number(Vue.version.split('.')[0]);
    if (version < 2) {
      throw new Error('vue-iframe-box supports vue version 2.0 and above. You are using Vue@' + version + '. Please upgrade to the latest version of Vue.');
    }
    var langsSet = {};
    var locale = '';
    var pattern = '';
    var comma = '';

    function setLangs(options) {
      locale = options.locale || 'cn-ZH';
      comma = locale === 'cn-ZH' ? '，' : ',';
      pattern = options.pattern || '{:param}';
      langsSet[locale] = options[locale] || langsSet[locale] || {};
      return langsSet[locale];
    }

    function langsObjectTransfer(val, langs) {
      var Msg = '';
      var originLangs = Object.prototype.toString.call(val) === '[object Array]' ? val : [val];

      var _loop = function _loop(i) {
        var num = 0;
        var langMsg = '';
        if (originLangs[i].hasOwnProperty('content')) {
          langMsg = langs[originLangs[i].content] ? langs[originLangs[i].content] : originLangs[i].content;
          langMsg = langMsg.replace(new RegExp(pattern, 'g'), function () {
            num++;
            var lang = '';
            if (originLangs[i].params[num - 1]) {
              lang = langs[originLangs[i].params[num - 1]] ? langs[originLangs[i].params[num - 1]] : originLangs[i].params[num - 1];
            } else {
              lang = '';
            }
            return lang;
          });
        } else {
          console.warn('The subject content-key of translation is content, and params-key is params, as {content: "content", params: ["param1"]}');
        }
        Msg += i !== originLangs.length - 1 ? langMsg + comma : langMsg;
      };

      for (var i = 0; i < originLangs.length; i++) {
        _loop(i);
      }
      return Msg;
    }
    function updateVm() {
      if (window.vm) {
        window.vm.$forceUpdate();
      } else {
        console.log("window.vm is not found, please bind new Vue() to window.vm or update view with 'this.$forceUpdate'.");
      }
    }
    setLangs(options);
    var i18nPlugin = function i18nPlugin(langsKey, isMessage) {
      var langs = langsSet[locale];
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
          results = langsObjectTransfer(langsKey, langs);
          break;
        default:
          results = langsKey;
      }
      return results;
    };
    i18nPlugin.setLangs = function (options) {
      this.db = setLangs(options);

      updateVm();
      return locale;
    };
    i18nPlugin.hasLangs = function (localeName) {
      return Object.keys(langsSet[localeName]).length > 0;
    };
    i18nPlugin.clearLangs = function (key) {
      key instanceof Array || (key = [key]);
      key.map(function (item) {
        delete langsSet[item];
      });
      this.setLangs({ locale: locale });
      return true;
    };
    i18nPlugin.db = langsSet[locale];
    Vue.prototype.$i18n = i18nPlugin;
  }
};

/***/ })
/******/ ]);
});
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 320:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 280:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/**
 * This Github Action will resolve all environment variables suffixed with one of the
 * two `BP_MODE` values (`DEVELOPMENT`, `PRODUCTION`) and will canonicalize them
 * based on what value the environment variable `BP_MODE` has.
 *
 * @author Josh Long
 */
const core = __nccwpck_require__(320);
const github = __nccwpck_require__(280);

// todo analyze the incoming event payload and then set BP_MODE to be something useful
try {

  function resolveGithubAction() {
    // we assume development by default; production only in
    // a very specific, purposeful scenario
    const {context} = __nccwpck_require__(280);
    if (context && context.payload && context.payload.action)
      return context.payload.action;
    return null
  }

  const action = resolveGithubAction();
  // console.log(action)
  // console.log(github.context)
  // console.log(github.context.payload)
  const bpMode = action === 'deploy-production-event' ? 'production' : 'development'

  core.exportVariable('BP_MODE', bpMode.toUpperCase())
  core.exportVariable('BP_MODE_LOWERCASE', bpMode.toLowerCase())

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  console.log('the BP_MODE is ' + bpMode)
  for (let k in process.env) {
    const isForThisEnvironment = k.toLowerCase().endsWith('_' + bpMode)
    if (isForThisEnvironment) {
      const sansSuffix = k.substring(0, k.length - (1 + bpMode.length))
      core.exportVariable(sansSuffix, process.env[k])
      console.log(`exporting ${sansSuffix} to have the value of ${k}`)
    }
  }
} catch (error) {
  core.setFailed(error.message);
}


})();

module.exports = __webpack_exports__;
/******/ })()
;
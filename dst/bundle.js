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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result;
(function (Result) {
    Result["AC"] = "AC";
    Result["WRONG"] = "OTHER";
    Result["NODATA"] = "NODATA";
})(Result = exports.Result || (exports.Result = {}));
function createResult(verdict) {
    return verdict === Result.AC ? Result.AC :
        verdict === Result.NODATA ? Result.NODATA :
            Result.WRONG;
}
exports.createResult = createResult;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = __webpack_require__(0);
function createSubmission(contestId, problemId, verdict, userId) {
    return {
        contestId: contestId,
        problemId: problemId,
        result: Result_1.createResult(verdict),
        userId: userId,
    };
}
exports.createSubmission = createSubmission;
function equal(valueX, valueY) {
    return valueX.contestId === valueY.contestId &&
        valueX.problemId === valueY.problemId &&
        valueX.result === valueY.result &&
        valueX.userId === valueY.userId;
}
exports.equal = equal;
function marshal(submission) {
    return submission.problemId + "/" + submission.contestId + "/" + submission.result + "/" + submission.userId;
}
exports.marshal = marshal;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.strageKeyAC = 'submissionsAC';
exports.strageKeyWA = 'submissionsWA';


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Submission_1 = __webpack_require__(1);
var SubmissionsCollection = /** @class */ (function () {
    function SubmissionsCollection() {
        this.submissions = [];
        this.submissionSet = new Set();
    }
    SubmissionsCollection.prototype.insert = function (submission) {
        var key = Submission_1.marshal(submission);
        if (this.submissionSet.has(key) === false) {
            this.submissions.push(submission);
            this.submissionSet.add(key);
            console.log('new submission data detected : ', submission);
            return true;
        }
        return false;
    };
    SubmissionsCollection.prototype.insertAll = function (submission) {
        var _this = this;
        return submission
            .map(function (s) { return _this.insert(s); })
            .includes(true);
    };
    SubmissionsCollection.prototype.marshal = function () {
        return JSON.stringify(this.submissions);
    };
    SubmissionsCollection.prototype.unmarshal = function (jsonStr) {
        try {
            this.submissions = JSON.parse(jsonStr);
            this.submissionSet = new Set(this.submissions.map(function (s) { return Submission_1.marshal(s); }));
        }
        catch (e) {
            console.log(e);
            this.submissions = [];
            this.submissionSet = new Set();
        }
    };
    SubmissionsCollection.prototype.extractAGC = function () {
        return this.submissions.filter(function (s) { return /^agc\d+$/.test(s.contestId); });
    };
    SubmissionsCollection.prototype.extractARC = function () {
        return this.submissions.filter(function (s) { return /^arc\d+$/.test(s.contestId); });
    };
    SubmissionsCollection.prototype.extractABC = function () {
        return this.submissions.filter(function (s) { return /^abc\d+$/.test(s.contestId); });
    };
    SubmissionsCollection.prototype.extractOther = function () {
        return this.submissions.filter(function (s) { return /^a[rgb]c\d+$/.test(s.contestId) === false; });
    };
    SubmissionsCollection.prototype.logging = function () {
        console.log(this.submissions);
    };
    return SubmissionsCollection;
}());
exports.SubmissionsCollection = SubmissionsCollection;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationAtCoder_1 = __webpack_require__(5);
var ScraperBetaAtcoder_1 = __webpack_require__(6);
var ScraperOldAtcoder_1 = __webpack_require__(7);
var ApplicationAtCoderProblems_1 = __webpack_require__(8);
var ApplicationOldAtCoderProblems_1 = __webpack_require__(10);
var SiteChecker_1 = __webpack_require__(12);
var AtCoderProblemsRush = /** @class */ (function () {
    function AtCoderProblemsRush() {
        this.site = SiteChecker_1.siteChecker(document.location.href);
    }
    AtCoderProblemsRush.prototype.run = function () {
        switch (this.site) {
            case SiteChecker_1.Site.BetaAtCoder:
                (function () {
                    var app = new ApplicationAtCoder_1.ApplicationAtCoder(ScraperBetaAtcoder_1.ScraperBetaAtCoder);
                    app.updateSubmissions();
                    var containerDom = document.querySelector('table');
                    var observerOptions = {
                        childList: true,
                        subtree: true,
                    };
                    var observer = new MutationObserver(function (mutations, obs) {
                        console.log((new Date()).toTimeString());
                        console.log('mutation observed. update submissions');
                        obs.disconnect();
                        setTimeout(update, 5000);
                    });
                    var update = function () {
                        app.updateSubmissions();
                        observer.observe(containerDom, observerOptions);
                    };
                    update();
                })();
                break;
            case SiteChecker_1.Site.BetaAtCoderTask:
                (function () {
                    var app = new ApplicationAtCoder_1.ApplicationAtCoder(ScraperBetaAtcoder_1.ScraperBetaAtCoder);
                    app.updateTaskStates();
                })();
                break;
            case SiteChecker_1.Site.OldAtCoder:
                (function () {
                    var app = new ApplicationAtCoder_1.ApplicationAtCoder(ScraperOldAtcoder_1.ScraperOldAtCoder);
                    app.updateSubmissions();
                })();
                break;
            case SiteChecker_1.Site.OldAtCoderProblems:
                (function () {
                    var app = new ApplicationOldAtCoderProblems_1.ApplicationOldAtCoderProblems();
                    var containerDom = document.querySelector('div.container > div.container');
                    var observerOptions = {
                        attributes: true,
                        childList: true,
                        subtree: true,
                    };
                    var observer = new MutationObserver(function (mutations, obs) {
                        console.log((new Date()).toTimeString());
                        console.log('mutation observed. update submissions');
                        obs.disconnect();
                        app.updateSubmissions();
                        app.applySavedSubmissions();
                        obs.observe(containerDom, observerOptions);
                    });
                    app.updateSubmissions();
                    app.applySavedSubmissions();
                    observer.observe(containerDom, observerOptions);
                })();
                break;
            case SiteChecker_1.Site.AtCoderProblems:
                (function () {
                    var app = new ApplicationAtCoderProblems_1.ApplicationAtCoderProblems();
                    var containerDom = document.querySelector('div.container');
                    var observerOptions = {
                        attributes: true,
                        childList: true,
                        subtree: true,
                    };
                    var observer = new MutationObserver(function (mutations, obs) {
                        console.log((new Date()).toTimeString());
                        console.log('mutation observed. update submissions');
                        obs.disconnect();
                        app.updateSubmissions();
                        app.applySavedSubmissions();
                        obs.observe(containerDom, observerOptions);
                    });
                    app.updateSubmissions();
                    app.applySavedSubmissions();
                    observer.observe(containerDom, observerOptions);
                })();
                break;
            default:
                break;
        }
    };
    return AtCoderProblemsRush;
}());
(function () {
    'use strict';
    // Your code here...
    var app = new AtCoderProblemsRush();
    app.run();
})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IApplication_1 = __webpack_require__(2);
var Result_1 = __webpack_require__(0);
var SubmissionsCollection_1 = __webpack_require__(3);
var ApplicationAtCoder = /** @class */ (function () {
    function ApplicationAtCoder(scraperClass) {
        this.submissionSetAC = new SubmissionsCollection_1.SubmissionsCollection();
        this.submissionSetWA = new SubmissionsCollection_1.SubmissionsCollection();
        this.scraperClass = scraperClass;
    }
    ApplicationAtCoder.prototype.save = function (saveAC, saveWA) {
        if (saveAC)
            GM_setValue(IApplication_1.strageKeyAC, this.submissionSetAC.marshal());
        if (saveWA)
            GM_setValue(IApplication_1.strageKeyWA, this.submissionSetWA.marshal());
    };
    ApplicationAtCoder.prototype.load = function () {
        this.submissionSetAC.unmarshal(GM_getValue(IApplication_1.strageKeyAC, '[]'));
        this.submissionSetWA.unmarshal(GM_getValue(IApplication_1.strageKeyWA, '[]'));
    };
    ApplicationAtCoder.prototype.updateSubmissions = function () {
        var scraper = new this.scraperClass();
        var submissions = scraper.scrape(document);
        this.load();
        var newAC = this.submissionSetAC
            .insertAll(submissions.filter(function (s) { return s.result === Result_1.Result.AC; }));
        var newWA = this.submissionSetWA
            .insertAll(submissions.filter(function (s) { return s.result === Result_1.Result.WRONG; }));
        this.save(newAC, newWA);
    };
    ApplicationAtCoder.prototype.updateTaskStates = function () {
        var scraper = new this.scraperClass();
        var tasks = document.querySelectorAll('tr > td:nth-child(2)');
        this.load();
        var WA = this.submissionSetWA.submissions.filter(function (s) { return s.contestId === scraper.contestId; });
        var AC = this.submissionSetAC.submissions.filter(function (s) { return s.contestId === scraper.contestId; });
        tasks.forEach(function (t) {
            var url = t.querySelector('a').href;
            var taskName = scraper.parseTaskUrl(url);
            WA.filter(function (s) { return s.problemId === taskName; })
                .forEach(function (s) { return t.parentElement.classList.add('warning'); });
            AC.filter(function (s) { return s.problemId === taskName; })
                .forEach(function (s) {
                t.parentElement.classList.remove('warning');
                t.parentElement.classList.add('success');
            });
        });
    };
    return ApplicationAtCoder;
}());
exports.ApplicationAtCoder = ApplicationAtCoder;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = __webpack_require__(0);
var Submission_1 = __webpack_require__(1);
var ScraperBetaAtCoder = /** @class */ (function () {
    function ScraperBetaAtCoder() {
        this.userId = this.getLoggedInUserId();
        this.contestId = this.getContestId(document.location.pathname);
    }
    ScraperBetaAtCoder.prototype.getLoggedInUserId = function () {
        return userScreenName === undefined ? '' : userScreenName;
    };
    ScraperBetaAtCoder.prototype.getContestId = function (pathname) {
        return /\/contests\/(.+?)\//.exec(pathname)[1];
    };
    ScraperBetaAtCoder.prototype.parseUserUrl = function (url) {
        return /users\/(\w+)$/.exec(url)[1];
    };
    ScraperBetaAtCoder.prototype.parseTaskUrl = function (url) {
        return /\/tasks\/(.+)$/.exec(url)[1];
    };
    ScraperBetaAtCoder.prototype.parseVerdict = function (verdict) {
        return Result_1.createResult(verdict);
    };
    // {user, submission}
    ScraperBetaAtCoder.prototype.parseTableRow = function (tr) {
        var taskUrl = tr.children.item(1).querySelector('a').pathname;
        var userUrl = tr.children.item(2).querySelector('a').href;
        var verdict = tr.children.item(6).textContent;
        return Submission_1.createSubmission(this.contestId, this.parseTaskUrl(taskUrl), verdict, this.parseUserUrl(userUrl));
    };
    ScraperBetaAtCoder.prototype.scrape = function (doc) {
        var _this = this;
        return Array.from(doc.querySelectorAll('tbody > tr'))
            .map(function (tr) { return _this.parseTableRow(tr); })
            .filter(function (sub) { return sub.userId === _this.userId; });
    };
    return ScraperBetaAtCoder;
}());
exports.ScraperBetaAtCoder = ScraperBetaAtCoder;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = __webpack_require__(0);
var Submission_1 = __webpack_require__(1);
var ScraperOldAtCoder = /** @class */ (function () {
    function ScraperOldAtCoder() {
        this.userId = this.getLoggedInUserId(document.cookie);
        this.contestId = this.getContestId(document.domain);
    }
    ScraperOldAtCoder.prototype.getLoggedInUserId = function (cookie) {
        return cookie.split('; ')
            .filter(function (x) { return /_user_name=/.test(x); })
            .concat([''])[0]
            .slice('_user_name='.length);
    };
    ScraperOldAtCoder.prototype.getContestId = function (domain) {
        return domain.split('.')[0];
    };
    ScraperOldAtCoder.prototype.parseUserUrl = function (url) {
        return /atcoder\.jp\/user\/(\w+)$/.exec(url)[1];
    };
    ScraperOldAtCoder.prototype.parseTaskUrl = function (url) {
        return /\/tasks\/(.+)$/.exec(url)[1];
    };
    ScraperOldAtCoder.prototype.parseVerdict = function (verdict) {
        return Result_1.createResult(verdict);
    };
    // {user, submission}
    ScraperOldAtCoder.prototype.parseTableRow = function (tr) {
        var isMySubmissions = /submissions\/me/.test(document.location.pathname);
        var taskUrl = tr.children.item(1).querySelector('a').pathname;
        var userUrl = isMySubmissions ?
            "atcoder.jp/user/" + this.userId : tr.children.item(2).querySelector('a').href;
        var verdict = tr.children.item(isMySubmissions ? 4 : 6).textContent;
        return Submission_1.createSubmission(this.contestId, this.parseTaskUrl(taskUrl), verdict, this.parseUserUrl(userUrl));
    };
    ScraperOldAtCoder.prototype.scrape = function (doc) {
        var _this = this;
        return Array.from(doc.querySelectorAll('tbody > tr'))
            .map(function (tr) { return _this.parseTableRow(tr); })
            .filter(function (sub) { return sub.userId === _this.userId; });
    };
    return ScraperOldAtCoder;
}());
exports.ScraperOldAtCoder = ScraperOldAtCoder;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IApplication_1 = __webpack_require__(2);
var Result_1 = __webpack_require__(0);
var SubmissionsCollection_1 = __webpack_require__(3);
var ScraperAtCoderProblems_1 = __webpack_require__(9);
var ApplicationAtCoderProblems = /** @class */ (function () {
    function ApplicationAtCoderProblems() {
        this.submissionSetAC = new SubmissionsCollection_1.SubmissionsCollection();
        this.submissionSetWA = new SubmissionsCollection_1.SubmissionsCollection();
    }
    ApplicationAtCoderProblems.prototype.save = function (saveAC, saveWA) {
        if (saveAC)
            GM_setValue(IApplication_1.strageKeyAC, this.submissionSetAC.marshal());
        if (saveWA)
            GM_setValue(IApplication_1.strageKeyWA, this.submissionSetWA.marshal());
    };
    ApplicationAtCoderProblems.prototype.load = function () {
        this.submissionSetAC.unmarshal(GM_getValue(IApplication_1.strageKeyAC, '[]'));
        this.submissionSetWA.unmarshal(GM_getValue(IApplication_1.strageKeyWA, '[]'));
    };
    ApplicationAtCoderProblems.prototype.updateSubmissions = function () {
        var scraper = new ScraperAtCoderProblems_1.ScraperAtCoderProblems();
        if (scraper.doneFetchingProblemSet(document) === false)
            return false;
        var submissions = scraper.scrape(document);
        this.load();
        var userIds = this.savedUserIds();
        submissions = submissions.filter(function (s) { return userIds.has(s.userId); });
        var newAC = this.submissionSetAC
            .insertAll(submissions.filter(function (s) { return s.result === Result_1.Result.AC; }));
        var newWA = this.submissionSetWA
            .insertAll(submissions.filter(function (s) { return s.result === Result_1.Result.WRONG; }));
        this.save(newAC, newWA);
        return true;
    };
    ApplicationAtCoderProblems.prototype.applySavedSubmissions = function () {
        var scraper = new ScraperAtCoderProblems_1.ScraperAtCoderProblems();
        var submissions = scraper.scrape(document);
        this.load();
        var problemMapping = scraper.makeProblemIdToTableCellMap(document);
        var ac = this.submissionSetAC.submissions.filter(function (s) { return s.userId === scraper.userId; });
        var wa = this.submissionSetWA.submissions.filter(function (s) { return s.userId === scraper.userId; });
        function setWA(s) {
            try {
                problemMapping.get(scraper.makeProblemKey(s.contestId, s.problemId))
                    .classList.add('table-warning');
            }
            catch (e) {
                return;
            }
        }
        function setAC(s) {
            try {
                var list = problemMapping.get(scraper.makeProblemKey(s.contestId, s.problemId))
                    .classList;
                list.remove('table-warning');
                list.add('table-success');
            }
            catch (e) {
                return;
            }
        }
        this.submissionSetWA.submissions
            .filter(function (s) { return s.userId === scraper.userId; })
            .forEach(setWA);
        this.submissionSetAC.submissions
            .filter(function (s) { return s.userId === scraper.userId; })
            .forEach(setAC);
    };
    ApplicationAtCoderProblems.prototype.savedUserIds = function () {
        return new Set(this.submissionSetAC.submissions.map(function (s) { return s.userId; })
            .concat(this.submissionSetWA.submissions.map(function (s) { return s.userId; })));
    };
    return ApplicationAtCoderProblems;
}());
exports.ApplicationAtCoderProblems = ApplicationAtCoderProblems;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = __webpack_require__(0);
var Submission_1 = __webpack_require__(1);
var ScraperAtCoderProblems = /** @class */ (function () {
    function ScraperAtCoderProblems() {
        this.userId = this.parseUserId(document.location.href);
    }
    ScraperAtCoderProblems.prototype.parseUserId = function (url) {
        var reg = /^https:\/\/kenkoooo\.com\/atcoder\/#\/table\/([\w-]+)/;
        if (reg.test(url) === false) {
            return '';
        }
        var users = reg.exec(url)[1].split('/');
        return users[0];
    };
    ScraperAtCoderProblems.prototype.isProblemUrl = function (url) {
        return /atcoder\.jp\/contests\/.+?\/tasks\/.+$/.test(url);
    };
    ScraperAtCoderProblems.prototype.parseContestId = function (url) {
        return /atcoder\.jp\/contests\/(.+?)\/tasks\/.+$/.exec(url)[1];
    };
    ScraperAtCoderProblems.prototype.parseProblemId = function (url) {
        return /atcoder\.jp\/contests\/.+?\/tasks\/(.+)$/.exec(url)[1];
    };
    ScraperAtCoderProblems.prototype.parseVerdict = function (td) {
        var classArray = Array.from(td.classList);
        if (classArray.includes('table-success'))
            return Result_1.Result.AC;
        if (classArray.includes('table-warning'))
            return Result_1.Result.WRONG;
        return Result_1.Result.NODATA;
    };
    ScraperAtCoderProblems.prototype.parseTableCell = function (td) {
        try {
            var url = td.querySelector('a').href;
            if (this.isProblemUrl(url) === false)
                return [];
            var verdict = this.parseVerdict(td);
            return [Submission_1.createSubmission(this.parseContestId(url), this.parseProblemId(url), verdict, this.userId)];
        }
        catch (e) {
            return [];
        }
    };
    ScraperAtCoderProblems.prototype.parseTableRow = function (tr) {
        var _this = this;
        return [].concat.apply([], Array.from(tr.querySelectorAll('td'))
            .map(function (td) { return _this.parseTableCell(td); })).filter(function (s) { return s.result !== Result_1.Result.NODATA; });
    };
    ScraperAtCoderProblems.prototype.scrape = function (doc) {
        var _this = this;
        if (this.userId === '')
            return [];
        return [].concat.apply([], Array.from(doc.querySelectorAll('tbody > tr'))
            .map(function (tr) { return _this.parseTableRow(tr); }));
    };
    ScraperAtCoderProblems.prototype.doneFetchingProblemSet = function (doc) {
        var _this = this;
        return Array.from(doc.querySelector('tbody > tr').querySelectorAll('a'))
            .map(function (e) { return e.href; }).some(function (url) { return _this.isProblemUrl(url); });
    };
    ScraperAtCoderProblems.prototype.makeProblemKey = function (contestId, problemId) {
        return problemId + "/" + contestId;
    };
    ScraperAtCoderProblems.prototype.makeProblemIdToTableCellMap = function (doc) {
        var _this = this;
        var res = new Map();
        var td = [].concat.apply([], Array.from(doc.getElementsByTagName('tbody'))
            .map(function (e) { return Array.from(e.getElementsByTagName('td')); }));
        var problemOfCell = td.map(function (e) { return _this.parseTableCell(e); });
        problemOfCell.forEach(function (p, i) {
            if (p.length === 0)
                return;
            var key = _this.makeProblemKey(p[0].contestId, p[0].problemId);
            res.set(key, td[i]);
        });
        return res;
    };
    return ScraperAtCoderProblems;
}());
exports.ScraperAtCoderProblems = ScraperAtCoderProblems;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IApplication_1 = __webpack_require__(2);
var Result_1 = __webpack_require__(0);
var SubmissionsCollection_1 = __webpack_require__(3);
var ScraperOldAtCoderProblems_1 = __webpack_require__(11);
var ApplicationOldAtCoderProblems = /** @class */ (function () {
    function ApplicationOldAtCoderProblems() {
        this.submissionSetAC = new SubmissionsCollection_1.SubmissionsCollection();
        this.submissionSetWA = new SubmissionsCollection_1.SubmissionsCollection();
    }
    ApplicationOldAtCoderProblems.prototype.save = function (saveAC, saveWA) {
        if (saveAC)
            GM_setValue(IApplication_1.strageKeyAC, this.submissionSetAC.marshal());
        if (saveWA)
            GM_setValue(IApplication_1.strageKeyWA, this.submissionSetWA.marshal());
    };
    ApplicationOldAtCoderProblems.prototype.load = function () {
        this.submissionSetAC.unmarshal(GM_getValue(IApplication_1.strageKeyAC, '[]'));
        this.submissionSetWA.unmarshal(GM_getValue(IApplication_1.strageKeyWA, '[]'));
    };
    ApplicationOldAtCoderProblems.prototype.updateSubmissions = function () {
        var scraper = new ScraperOldAtCoderProblems_1.ScraperOldAtCoderProblems();
        if (scraper.doneFetchingProblemSet(document) === false)
            return false;
        var submissions = scraper.scrape(document);
        this.load();
        var userIds = this.savedUserIds();
        submissions = submissions.filter(function (s) { return userIds.has(s.userId); });
        var newAC = this.submissionSetAC
            .insertAll(submissions.filter(function (s) { return s.result === Result_1.Result.AC; }));
        var newWA = this.submissionSetWA
            .insertAll(submissions.filter(function (s) { return s.result === Result_1.Result.WRONG; }));
        this.save(newAC, newWA);
        return true;
    };
    ApplicationOldAtCoderProblems.prototype.applySavedSubmissions = function () {
        var scraper = new ScraperOldAtCoderProblems_1.ScraperOldAtCoderProblems();
        var submissions = scraper.scrape(document);
        this.load();
        var problemMapping = scraper.makeProblemIdToTableCellMap(document);
        var ac = this.submissionSetAC.submissions.filter(function (s) { return s.userId === scraper.userId; });
        var wa = this.submissionSetWA.submissions.filter(function (s) { return s.userId === scraper.userId; });
        function setWA(s) {
            try {
                problemMapping.get(scraper.makeProblemKey(s.contestId, s.problemId))
                    .classList.add('warning');
            }
            catch (e) {
                return;
            }
        }
        function setAC(s) {
            try {
                var list = problemMapping.get(scraper.makeProblemKey(s.contestId, s.problemId))
                    .classList;
                list.remove('warning');
                list.add('success');
            }
            catch (e) {
                return;
            }
        }
        this.submissionSetWA.submissions
            .filter(function (s) { return s.userId === scraper.userId; })
            .forEach(setWA);
        this.submissionSetAC.submissions
            .filter(function (s) { return s.userId === scraper.userId; })
            .forEach(setAC);
    };
    ApplicationOldAtCoderProblems.prototype.savedUserIds = function () {
        return new Set(this.submissionSetAC.submissions.map(function (s) { return s.userId; })
            .concat(this.submissionSetWA.submissions.map(function (s) { return s.userId; })));
    };
    return ApplicationOldAtCoderProblems;
}());
exports.ApplicationOldAtCoderProblems = ApplicationOldAtCoderProblems;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = __webpack_require__(0);
var Submission_1 = __webpack_require__(1);
var ScraperOldAtCoderProblems = /** @class */ (function () {
    function ScraperOldAtCoderProblems() {
        this.userId = this.parseUserId(document.location.href);
    }
    ScraperOldAtCoderProblems.prototype.parseUserId = function (url) {
        var patternSolo = /^https:\/\/old\.kenkoooo\.com\/atcoder\/\?user=([\w-]+)/;
        var patternRival = /^https:\/\/old\.kenkoooo\.com\/atcoder\/\?user=([\w-]+)&rivals=[\w-]*&kind=category$/;
        if (patternSolo.test(url)) {
            return patternSolo.exec(url)[1];
        }
        if (patternRival.test(url)) {
            return patternRival.exec(url)[1];
        }
        return '';
    };
    ScraperOldAtCoderProblems.prototype.isProblemUrl = function (url) {
        return /atcoder\.jp\/contests\/.+?\/tasks\/.+$/.test(url);
    };
    ScraperOldAtCoderProblems.prototype.parseContestId = function (url) {
        return /atcoder\.jp\/contests\/(.+?)\/tasks\/.+$/.exec(url)[1];
    };
    ScraperOldAtCoderProblems.prototype.parseProblemId = function (url) {
        return /atcoder\.jp\/contests\/.+?\/tasks\/(.+)$/.exec(url)[1];
    };
    ScraperOldAtCoderProblems.prototype.parseVerdict = function (td) {
        var classArray = Array.from(td.classList);
        if (classArray.includes('success'))
            return Result_1.Result.AC;
        if (classArray.includes('warning'))
            return Result_1.Result.WRONG;
        return Result_1.Result.NODATA;
    };
    ScraperOldAtCoderProblems.prototype.parseTableCell = function (td) {
        try {
            var url = td.querySelector('a').href;
            if (this.isProblemUrl(url) === false)
                return [];
            var verdict = this.parseVerdict(td);
            return [Submission_1.createSubmission(this.parseContestId(url), this.parseProblemId(url), verdict, this.userId)];
        }
        catch (e) {
            return [];
        }
    };
    ScraperOldAtCoderProblems.prototype.parseTableRow = function (tr) {
        var _this = this;
        return [].concat.apply([], Array.from(tr.querySelectorAll('td'))
            .map(function (td) { return _this.parseTableCell(td); })).filter(function (s) { return s.result !== Result_1.Result.NODATA; });
    };
    ScraperOldAtCoderProblems.prototype.scrape = function (doc) {
        var _this = this;
        if (this.userId === '')
            return [];
        return [].concat.apply([], Array.from(doc.querySelectorAll('tbody > tr'))
            .map(function (tr) { return _this.parseTableRow(tr); }));
    };
    ScraperOldAtCoderProblems.prototype.doneFetchingProblemSet = function (doc) {
        var _this = this;
        return Array.from(doc.querySelector('tbody > tr').querySelectorAll('a'))
            .map(function (e) { return e.href; }).some(function (url) { return _this.isProblemUrl(url); });
    };
    ScraperOldAtCoderProblems.prototype.makeProblemKey = function (contestId, problemId) {
        return problemId + "/" + contestId;
    };
    ScraperOldAtCoderProblems.prototype.makeProblemIdToTableCellMap = function (doc) {
        var _this = this;
        var res = new Map();
        var td = [].concat.apply([], Array.from(doc.getElementsByTagName('tbody'))
            .map(function (e) { return Array.from(e.getElementsByTagName('td')); }));
        var problemOfCell = td.map(function (e) { return _this.parseTableCell(e); });
        problemOfCell.forEach(function (p, i) {
            if (p.length === 0)
                return;
            var key = _this.makeProblemKey(p[0].contestId, p[0].problemId);
            res.set(key, td[i]);
        });
        return res;
    };
    return ScraperOldAtCoderProblems;
}());
exports.ScraperOldAtCoderProblems = ScraperOldAtCoderProblems;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Site;
(function (Site) {
    Site[Site["OldAtCoder"] = 0] = "OldAtCoder";
    Site[Site["BetaAtCoder"] = 1] = "BetaAtCoder";
    Site[Site["BetaAtCoderTask"] = 2] = "BetaAtCoderTask";
    Site[Site["OldAtCoderProblems"] = 3] = "OldAtCoderProblems";
    Site[Site["AtCoderProblems"] = 4] = "AtCoderProblems";
    Site[Site["OTHER"] = 5] = "OTHER";
})(Site = exports.Site || (exports.Site = {}));
function siteChecker(url) {
    if (isOldAtCoder(url))
        return Site.OldAtCoder;
    if (isBetaAtCoder(url))
        return Site.BetaAtCoder;
    if (isBetaAtCoderTask(url))
        return Site.BetaAtCoderTask;
    if (isAtcoderProblems(url))
        return Site.AtCoderProblems;
    if (isOldAtcoderProblems(url))
        return Site.OldAtCoderProblems;
    return Site.OTHER;
}
exports.siteChecker = siteChecker;
function isOldAtCoder(url) {
    var pattern = /.+\.contest\.atcoder\.jp\/submissions(?!\/\d)/;
    return pattern.test(url);
}
function isBetaAtCoder(url) {
    var pattern = /atcoder\.jp\/contests\/.+\/submissions(?!\/\d+)/;
    return pattern.test(url);
}
function isBetaAtCoderTask(url) {
    var pattern = /atcoder\.jp\/contests\/.+\/tasks$/;
    return pattern.test(url);
}
function isOldAtcoderProblems(url) {
    var pattern = /^https:\/\/old\.kenkoooo\.com\/atcoder\/\?(.+)/;
    if (pattern.test(url) === false)
        return false;
    var query = pattern.exec(url)[1].split('&');
    var hasUserName = query.map(function (q) { return /user=.+/.test(q); }).includes(true);
    var kind = query.filter(function (q) { return /kind=.+/.test(q); }).map(function (q) { return /kind=(.+)/.exec(q)[1]; });
    var isCategory = kind.includes('category') || kind.length === 0;
    return hasUserName && isCategory;
}
function isAtcoderProblems(url) {
    var pattern = /^https:\/\/kenkoooo\.com\/atcoder\/#\/table\/(.+)/;
    if (pattern.test(url) === false)
        return false;
    var users = pattern.exec(url)[1].split('/');
    var hasUserName = users[0].length > 0;
    return hasUserName;
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
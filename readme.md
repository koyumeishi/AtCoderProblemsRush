# AtCoderProblemsRush

[![Build Status](https://travis-ci.org/koyumeishi/AtCoderProblemsRush.svg?branch=master)](https://travis-ci.org/koyumeishi/AtCoderProblemsRush)

[AtCoderProblemsRush](https://github.com/koyumeishi/AtCoderProblemsRush) speeds up [AtCoderProblems](http://kenkoooo.com/atcoder/).

## Overview

This UserScript store your submission data within your browser and show your progress before AtCoderProblems crawler runs.

## Demo
![demo](demo.gif)

## Installation

- install a userscript manager like [Tampermonkey](https://tampermonkey.net/)
- Install the script from  
    * [GitHub](https://koyumeishi.github.io/AtCoderProblemsRush/AtCoderProblemsRush.user.js)
    * [Greasy Fork](https://greasyfork.org/en/scripts/373299-atcoderproblemsrush)

## Usage

* Login to [AtCoder](https://atcoder.jp)
* Open your submissions page of the AtCoder Contest that you submitted at least one problem.  
  (e.g. [https://atcoder.jp/contests/abc103/submissions/me](https://atcoder.jp/contests/abc103/submissions/me) )  
  AtCoderProblemsRush collects your submission data.
* Open [AtCoderProblems Category page of yourself](https://kenkoooo.com/atcoder/#/table/koyumeishi).  
  You can see the submissions before the crawler runs or AtCoderProblems makes response.  
  AtCoderProblemsRush caches AtCoderProblems response. 
  From next time, you can see your progress very fast!

## Build

AtCoderProblemsRush is written in TypeScript.

```bash
# install node modules
npm install

# build UserScript
npm run build
```

## Test

```bash
npm test
```

## External Link

* [AtCoder](https://atcoder.jp)
* [AtCoderProblems](http://kenkoooo.com/atcoder/)


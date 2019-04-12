import { Site, siteChecker } from './SiteChecker';

test('site cheker: old atcoder', () => {
  expect(siteChecker('https://agc028.contest.atcoder.jp/submissions/all?task_screen_name=agc028_b&language_screen_name=gpp_5.3.0&status=AC'))
    .toBe(Site.OldAtCoder);
  expect(siteChecker('https://agc028.contest.atcoder.jp/submissions/me'))
    .toBe(Site.OldAtCoder);
  expect(siteChecker('https://code-festival-2018-qualb.contest.atcoder.jp/submissions/me/1'))
    .toBe(Site.OldAtCoder);
  expect(siteChecker('https://code-festival-2018-qualb.contest.atcoder.jp/submissions/3406596'))
    .toBe(Site.OTHER);
});

test('site cheker: new atcoder', () => {
  expect(siteChecker('https://atcoder.jp/contests/code-festival-2018-qualb/submissions?f.Language=3016&f.Status=AC&f.Task=code_festival_2018_qualb_c&f.User=&page=2'))
    .toBe(Site.BetaAtCoder);
  expect(siteChecker('https://atcoder.jp/contests/code-festival-2018-qualb/submissions/me'))
    .toBe(Site.BetaAtCoder);
  expect(siteChecker('https://atcoder.jp/contests/agc028/submissions/me?page=1'))
    .toBe(Site.BetaAtCoder);
  expect(siteChecker('https://atcoder.jp/contests/agc028/submissions/3402163'))
    .toBe(Site.OTHER);
});

test('site cheker: old atcoder problems', () => {
  expect(siteChecker('https://old.kenkoooo.com/atcoder/?user=koyumeishi'))
    .toBe(Site.OldAtCoderProblems);
  expect(siteChecker('https://old.kenkoooo.com/atcoder/?user=koyumeishi&rivals=kenkoooo&kind=category'))
    .toBe(Site.OldAtCoderProblems);
  expect(siteChecker('https://old.kenkoooo.com/atcoder/?user=koyumeishi&kind=user'))
    .toBe(Site.OTHER);
  expect(siteChecker('https://old.kenkoooo.com/atcoder/?user='))
    .toBe(Site.OTHER);
  expect(siteChecker('https://old.kenkoooo.com/atcoder/'))
    .toBe(Site.OTHER);
});

test('site cheker: atcoder problems', () => {
  expect(siteChecker('https://kenkoooo.com/atcoder/#/table/koyumeishi'))
    .toBe(Site.AtCoderProblems);
  expect(siteChecker('https://kenkoooo.com/atcoder/#/table/koyumeishi/kenkoooo'))
    .toBe(Site.AtCoderProblems);
  expect(siteChecker('https://kenkoooo.com/atcoder/#/list/koyumeishi/kenkoooo'))
    .toBe(Site.OTHER);
  expect(siteChecker('https://kenkoooo.com/atcoder/#/user/koyumeishi'))
    .toBe(Site.OTHER);
  expect(siteChecker('https://kenkoooo.com/atcoder/#/table//'))
    .toBe(Site.OTHER);
});

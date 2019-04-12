export enum Site {
  OldAtCoder,
  BetaAtCoder,
  BetaAtCoderTask,
  OldAtCoderProblems,
  AtCoderProblems,
  OTHER,
}

export function siteChecker(url: string): Site {
  if (isOldAtCoder(url)) return Site.OldAtCoder;
  if (isBetaAtCoder(url)) return Site.BetaAtCoder;
  if (isBetaAtCoderTask(url)) return Site.BetaAtCoderTask;
  if (isAtcoderProblems(url)) return Site.AtCoderProblems;
  if (isOldAtcoderProblems(url)) return Site.OldAtCoderProblems;
  return Site.OTHER;
}

function isOldAtCoder(url: string): boolean {
  const pattern = /.+\.contest\.atcoder\.jp\/submissions(?!\/\d)/;
  return pattern.test(url);
}

function isBetaAtCoder(url: string): boolean {
  const pattern = /atcoder\.jp\/contests\/.+\/submissions(?!\/\d+)/;
  return pattern.test(url);
}

function isBetaAtCoderTask(url: string): boolean {
  const pattern = /atcoder\.jp\/contests\/.+\/tasks$/;
  return pattern.test(url);
}

function isOldAtcoderProblems(url: string): boolean {
  const pattern = /^https:\/\/old\.kenkoooo\.com\/atcoder\/\?(.+)/;
  if (pattern.test(url) === false) return false;

  const query = pattern.exec(url)[1].split('&');
  const hasUserName = query.map(q => /user=.+/.test(q)).includes(true);
  const kind = query.filter(q => /kind=.+/.test(q)).map(q => /kind=(.+)/.exec(q)[1]);
  const isCategory = kind.includes('category') || kind.length === 0;
  return hasUserName && isCategory;
}

function isAtcoderProblems(url: string): boolean {
  const pattern = /^https:\/\/kenkoooo\.com\/atcoder\/#\/table\/(.+)/;
  if (pattern.test(url) === false) return false;

  const users = pattern.exec(url)[1].split('/');
  const hasUserName = users[0].length > 0;
  return hasUserName;
}

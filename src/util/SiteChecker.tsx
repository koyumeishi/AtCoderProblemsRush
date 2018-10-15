export enum Site {
  OldAtCoder,
  BetaAtCoder,
  AtCoderProblems,
  OTHER,
}

export function siteChecker(url: string): Site {
  if (isOldAtCoder(url)) return Site.OldAtCoder;
  if (isBetaAtCoder(url)) return Site.BetaAtCoder;
  if (isAtcoderProblems(url)) return Site.AtCoderProblems;
  return Site.OTHER;
}

function isOldAtCoder(url: string): boolean {
  const pattern = /.+\.contest\.atcoder\.jp\/submissions(?!\/\d)/;
  return pattern.test(url);
}

function isBetaAtCoder(url: string): boolean {
  const pattern = /beta\.atcoder\.jp\/contests\/.+\/submissions(?!\/\d+)/;
  return pattern.test(url);
}

function isAtcoderProblems(url: string): boolean {
  const pattern = /^https:\/\/kenkoooo\.com\/atcoder\/\?(.+)/;
  if (pattern.test(url) === false) return false;

  const query = pattern.exec(url)[1].split('&');
  const hasUserName = query.map(q => /user=.+/.test(q)).includes(true);
  const kind = query.filter(q => /kind=.+/.test(q)).map(q => /kind=(.+)/.exec(q)[1]);
  const isCategory = kind.includes('category') || kind.length === 0;
  return hasUserName && isCategory;
}

export enum Site {
  OldAtCoder,
  BetaAtCoder,
  AtCoderProblems,
  AtCoderProblemsNotCatecory,
}

export function siteChecker(url: string): Site {
  if (isOldAtCoder(url)) return Site.OldAtCoder;
  if (isBetaAtCoder(url)) return Site.BetaAtCoder;
  if (isAtcoderProblems(url)) return Site.AtCoderProblems;
  return Site.AtCoderProblemsNotCatecory;
}

function isOldAtCoder(url: string): boolean {
  const pattern = /\w+\.contest\.atcoder\.jp\/submissions(?!\/\d)/;
  return pattern.test(url);
}

function isBetaAtCoder(url: string): boolean {
  const pattern = /beta\.atcoder\.jp\/contests\/\w+\/submissions(?!\/\d+)/;
  return pattern.test(url);
}

function isAtcoderProblems(url: string): boolean {
  const petterSolo: RegExp = /^https:\/\/kenkoooo\.com\/atcoder\/\?user=\w+$/;
  const petterRival: RegExp = /^https:\/\/kenkoooo\.com\/atcoder\/\?user=\w+&rivals=\w*&kind=category$/;
  return petterSolo.test(url) || petterRival.test(url);
}

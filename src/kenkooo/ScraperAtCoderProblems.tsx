import { Result } from '../struct/Result';
import { createSubmission, Submission } from '../struct/Submission';

export class ScraperAtCoderProblems {
  public userId: string;
  constructor () {
    this.userId = this.parseUserId(document.location.href);
  }

  public parseUserId(url: string): string {
    const petterSolo: RegExp = /^https:\/\/kenkoooo\.com\/atcoder\/\?user=([\w-]+)/;
    const petterRival: RegExp = /^https:\/\/kenkoooo\.com\/atcoder\/\?user=([\w-]+)&rivals=[\w-]*&kind=category$/;
    if (petterSolo.test(url)) {
      return petterSolo.exec(url)[1];
    }
    if (petterRival.test(url)) {
      return petterRival.exec(url)[1];
    }
    return '';
  }

  public isProblemUrl(url: string): boolean {
    return /atcoder\.jp\/contests\/.+?\/tasks\/.+$/.test(url);
  }
  public parseContestId(url: string): string {
    return /atcoder\.jp\/contests\/(.+?)\/tasks\/.+$/.exec(url)[1];
  }
  public parseProblemId(url: string): string {
    return /atcoder\.jp\/contests\/.+?\/tasks\/(.+)$/.exec(url)[1];
  }
  public parseVerdict(td: Element): Result {
    const classArray: string[] = Array.from(td.classList);
    if (classArray.includes('success')) return Result.AC;
    if (classArray.includes('warning')) return Result.WRONG;
    return Result.NODATA;
  }

  public parseTableCell (td: Element): Submission[] {
    try {
      const url: string = td.querySelector('a').href;
      if (this.isProblemUrl(url) === false) return [] as Submission[];
      const verdict: Result = this.parseVerdict(td);
      return [createSubmission(
        this.parseContestId(url),
        this.parseProblemId(url),
        verdict,
        this.userId)];
    } catch (e) {
      return [] as Submission[];
    }
  }

  public parseTableRow (tr: Element): Submission[] {
    return [].concat(...Array.from(tr.querySelectorAll('td'))
      .map(td => this.parseTableCell(td)))
      .filter((s: Submission) => s.result !== Result.NODATA);
  }

  public scrape (doc: Document): Submission[] {
    if (this.userId === '') return [];
    return [].concat(...Array.from(doc.querySelectorAll('tbody > tr'))
      .map(tr => this.parseTableRow(tr)));
  }

  public doneFetchingProblemSet (doc: Document): boolean {
    return Array.from(doc.querySelector('tbody > tr').querySelectorAll('a'))
      .map(e => e.href).some(url => this.isProblemUrl(url));
  }

  public makeProblemKey (contestId: string, problemId: string): string {
    return `${problemId}/${contestId}`;
  }

  public makeProblemIdToTableCellMap (doc: Document): Map<string, Element> {
    const res: Map<string, Element> = new Map<string, Element>();

    const td: Element[] = [].concat(...Array.from(doc.getElementsByTagName('tbody'))
      .map(e => Array.from(e.getElementsByTagName('td'))));

    const problemOfCell: Submission[][] = td.map(e => this.parseTableCell(e));

    problemOfCell.forEach((p: Submission[], i: number) => {
      if (p.length === 0) return;
      const key: string = this.makeProblemKey(p[0].contestId, p[0].problemId);
      res.set(key, td[i]);
    });
    return res;
  }
}

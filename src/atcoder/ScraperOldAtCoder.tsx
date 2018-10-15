import { createResult, Result } from '../struct/Result';
import { createSubmission, Submission } from '../struct/Submission';
import { IScraper } from './IScraper';

export class ScraperOldAtCoder implements IScraper {
  public contestId: string;
  public userId: string;

  constructor() {
    this.userId = this.getLoggedInUserId(document.cookie);
    this.contestId = this.getContestId(document.domain);
  }

  public getLoggedInUserId (cookie: string): string {
    return cookie.split('; ')
      .filter(x => /_user_name=/.test(x))
      .concat([''])[0]
      .slice('_user_name='.length);
  }

  public getContestId (domain: string): string {
    return domain.split('.')[0];
  }

  public parseUserUrl (url: string): string {
    return /atcoder\.jp\/user\/(\w+)$/.exec(url)[1];
  }

  public parseTaskUrl (url: string): string {
    return /\/tasks\/(.+)$/.exec(url)[1];
  }

  public parseVerdict (verdict: string): Result {
    return createResult(verdict);
  }

  // {user, submission}
  public parseTableRow (tr: Element): Submission {
    const isMySubmissions = /submissions\/me/.test(document.location.pathname);
    const taskUrl = tr.children.item(1).querySelector('a').pathname;
    const userUrl = isMySubmissions ?
      `atcoder.jp/user/${this.userId}` : tr.children.item(2).querySelector('a').href;
    const verdict = tr.children.item(isMySubmissions ? 4 : 6).textContent;

    return createSubmission(
      this.contestId,
      this.parseTaskUrl(taskUrl),
      verdict,
      this.parseUserUrl(userUrl));
  }

  public scrape (doc: Document): Submission[] {
    return Array.from(doc.querySelectorAll('tbody > tr'))
      .map(tr => this.parseTableRow(tr))
      .filter(sub => sub.userId === this.userId);
  }
}

import { createResult, Result } from '../struct/Result';
import { createSubmission, Submission } from '../struct/Submission';
import { IScraper } from './IScraper';

declare const userScreenName: string;

export class ScraperBetaAtCoder implements IScraper {
  public contestId: string;
  public userId: string;

  constructor() {
    this.userId = this.getLoggedInUserId();
    this.contestId = this.getContestId(document.location.pathname);
  }

  public getLoggedInUserId (): string {
    return userScreenName === undefined ? '' : userScreenName;
  }

  public getContestId (pathname: string): string {
    return /\/contests\/(.+?)\//.exec(pathname)[1];
  }

  public parseUserUrl (url: string): string {
    return /users\/(\w+)$/.exec(url)[1];
  }

  public parseTaskUrl (url: string): string {
    return /\/tasks\/(.+)$/.exec(url)[1];
  }

  public parseVerdict (verdict: string): Result {
    return createResult(verdict);
  }

  // {user, submission}
  public parseTableRow (tr: Element): Submission {
    const taskUrl = tr.children.item(1).querySelector('a').pathname;
    const userUrl = tr.children.item(2).querySelector('a').href;
    const verdict = tr.children.item(6).textContent;

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

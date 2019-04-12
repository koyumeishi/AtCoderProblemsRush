import { IApplication, strageKeyAC, strageKeyWA } from '../struct/IApplication';
import { Result } from '../struct/Result';
import { Submission } from '../struct/Submission';
import { SubmissionsCollection } from '../struct/SubmissionsCollection';
import { IScraper } from './IScraper';

export class ApplicationAtCoder<T extends IScraper> implements IApplication {
  public submissionSetAC: SubmissionsCollection;
  public submissionSetWA: SubmissionsCollection;
  private scraperClass: {new(): T};
  constructor (scraperClass: {new(): T}) {
    this.submissionSetAC = new SubmissionsCollection();
    this.submissionSetWA = new SubmissionsCollection();
    this.scraperClass = scraperClass;
  }
  public save (saveAC: boolean, saveWA: boolean): void {
    if (saveAC) GM_setValue(strageKeyAC, this.submissionSetAC.marshal());
    if (saveWA) GM_setValue(strageKeyWA, this.submissionSetWA.marshal());
  }
  public load (): void {
    this.submissionSetAC.unmarshal(GM_getValue(strageKeyAC, '[]'));
    this.submissionSetWA.unmarshal(GM_getValue(strageKeyWA, '[]'));
  }
  public updateSubmissions (): any {
    const scraper: T = new this.scraperClass();
    const submissions = scraper.scrape(document);

    this.load();
    const newAC: boolean = this.submissionSetAC
      .insertAll(submissions.filter((s: Submission) => s.result === Result.AC));
    const newWA: boolean = this.submissionSetWA
      .insertAll(submissions.filter((s: Submission) => s.result === Result.WRONG));
    this.save(newAC, newWA);
  }
  public updateTaskStates (): void {
    const scraper: T = new this.scraperClass();
    const tasks: NodeListOf<Element> = document.querySelectorAll('tr > td:nth-child(2)');
    this.load();
    const WA: Submission[] = this.submissionSetWA.submissions.filter(s => s.contestId === scraper.contestId);
    const AC: Submission[] = this.submissionSetAC.submissions.filter(s => s.contestId === scraper.contestId);
    tasks.forEach((t) => {
      const url: string = t.querySelector('a').href;
      const taskName: string = scraper.parseTaskUrl(url);
      WA.filter(s => s.problemId === taskName)
        .forEach(s => t.parentElement.classList.add('warning'));
      AC.filter(s => s.problemId === taskName)
        .forEach((s) => {
          t.parentElement.classList.remove('warning');
          t.parentElement.classList.add('success');
        });
    });
  }
}

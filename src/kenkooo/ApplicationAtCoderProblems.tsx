import { IApplication, strageKeyAC, strageKeyWA } from '../struct/IApplication';
import { Result } from '../struct/Result';
import { Submission } from '../struct/Submission';
import { SubmissionsCollection } from '../struct/SubmissionsCollection';
import { ScraperAtCoderProblems } from './ScraperAtCoderProblems';

export class ApplicationAtCoderProblems implements IApplication {
  public submissionSetAC: SubmissionsCollection;
  public submissionSetWA: SubmissionsCollection;
  constructor () {
    this.submissionSetAC = new SubmissionsCollection();
    this.submissionSetWA = new SubmissionsCollection();
  }

  public save (saveAC: boolean, saveWA: boolean): void {
    if (saveAC) GM_setValue(strageKeyAC, this.submissionSetAC.marshal());
    if (saveWA) GM_setValue(strageKeyWA, this.submissionSetWA.marshal());
  }
  public load (): void {
    this.submissionSetAC.unmarshal(GM_getValue(strageKeyAC, '[]'));
    this.submissionSetWA.unmarshal(GM_getValue(strageKeyWA, '[]'));
  }

  public updateSubmissions (): boolean {
    const scraper: ScraperAtCoderProblems = new ScraperAtCoderProblems();
    if (scraper.doneFetchingProblemSet(document) === false) return false;

    let submissions = scraper.scrape(document);

    this.load();
    const userIds: Set<string> = this.savedUserIds();
    submissions = submissions.filter(s => userIds.has(s.userId));
    const newAC: boolean = this.submissionSetAC
      .insertAll(submissions.filter((s: Submission) => s.result === Result.AC));
    const newWA: boolean = this.submissionSetWA
      .insertAll(submissions.filter((s: Submission) => s.result === Result.WRONG));
    this.save(newAC, newWA);

    return true;
  }

  public applySavedSubmissions (): void {
    const scraper: ScraperAtCoderProblems = new ScraperAtCoderProblems();
    const submissions = scraper.scrape(document);
    this.load();

    const problemMapping: Map<string, Element> = scraper.makeProblemIdToTableCellMap(document);
    const ac: Submission[] = this.submissionSetAC.submissions.filter(s => s.userId === scraper.userId);
    const wa: Submission[] = this.submissionSetWA.submissions.filter(s => s.userId === scraper.userId);

    function setWA(s: Submission): void {
      try {
        problemMapping.get(scraper.makeProblemKey(s.contestId, s.problemId))
          .classList.add('table-warning');
      } catch (e) {
        return;
      }
    }

    function setAC(s: Submission): void {
      try {
        const list: DOMTokenList = problemMapping.get(scraper.makeProblemKey(s.contestId, s.problemId))
          .classList;
        list.remove('table-warning');
        list.add('table-success');
      } catch (e) {
        return;
      }
    }

    this.submissionSetWA.submissions
      .filter(s => s.userId === scraper.userId)
      .forEach(setWA);
    this.submissionSetAC.submissions
      .filter(s => s.userId === scraper.userId)
      .forEach(setAC);
  }

  private savedUserIds (): Set<string> {
    return new Set<string>(
      this.submissionSetAC.submissions.map(s => s.userId)
      .concat(this.submissionSetWA.submissions.map(s => s.userId)));
  }

}

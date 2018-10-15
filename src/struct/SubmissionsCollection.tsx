import { equal, marshal, Submission } from './Submission';

export class SubmissionsCollection {
  public submissions: Submission[];
  private submissionSet: Set<string>;
  constructor () {
    this.submissions = [] as Submission[];
    this.submissionSet = new Set<string>();
  }

  public insert (submission: Submission): boolean {
    const key: string = marshal(submission);
    if (this.submissionSet.has(key) === false) {
      this.submissions.push(submission);
      this.submissionSet.add(key);
      console.log('new submission data detected : ', submission);
      return true;
    }
    return false;
  }

  public insertAll (submission: Submission[]): boolean {
    return submission
      .map((s: Submission) => this.insert(s))
      .includes(true);
  }

  public marshal (): string {
    return JSON.stringify(this.submissions);
  }

  public unmarshal (jsonStr: string): void {
    try {
      this.submissions = JSON.parse(jsonStr) as Submission[];
      this.submissionSet = new Set<string>(this.submissions.map(s => marshal(s)));
    } catch (e) {
      console.log(e);
      this.submissions = [] as Submission[];
      this.submissionSet = new Set<string>();
    }
  }

  public extractAGC (): Submission[] {
    return this.submissions.filter((s: Submission) => /^agc\d+$/.test(s.contestId));
  }

  public extractARC (): Submission[] {
    return this.submissions.filter((s: Submission) => /^arc\d+$/.test(s.contestId));
  }

  public extractABC (): Submission[] {
    return this.submissions.filter((s: Submission) => /^abc\d+$/.test(s.contestId));
  }

  public extractOther (): Submission[] {
    return this.submissions.filter((s: Submission) => /^a[rgb]c\d+$/.test(s.contestId) === false);
  }

  public logging (): void {
    console.log(this.submissions);
  }
}

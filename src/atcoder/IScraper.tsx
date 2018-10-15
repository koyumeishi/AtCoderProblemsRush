import { Result } from '../struct/Result';
import { Submission } from '../struct/Submission';

export interface IScraper {
  contestId: string;
  userId: string;
  getLoggedInUserId (cookie: string): string;
  getContestId (domain: string): string;
  parseUserUrl (url: string): string;
  parseTaskUrl (url: string): string;
  parseVerdict (verdict: string): Result;
  scrape (doc: Document): Submission[];
}

import { SubmissionsCollection } from './SubmissionsCollection';

export interface IApplication {
  submissionSetAC: SubmissionsCollection;
  submissionSetWA: SubmissionsCollection;
  save (saveAC: boolean, saveWA: boolean): void;
  load (): void;
  updateSubmissions (): any ;
}

export const strageKeyAC: string = 'submissionsAC';
export const strageKeyWA: string = 'submissionsWA';

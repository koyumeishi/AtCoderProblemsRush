import { createResult, Result } from './Result';

export interface Submission {
  contestId: string;
  problemId: string;
  result: Result;
  userId: string;
}

export function createSubmission(
    contestId: string,
    problemId: string,
    verdict: string,
    userId: string,
  ): Submission {
  return {
    contestId: contestId,
    problemId: problemId,
    result: createResult(verdict),
    userId: userId,
  };
}

export function equal(valueX: Submission, valueY: Submission): boolean {
  return valueX.contestId === valueY.contestId &&
    valueX.problemId === valueY.problemId &&
    valueX.result === valueY.result &&
    valueX.userId === valueY.userId;
}

export function marshal(submission: Submission): string {
  return `${submission.problemId}/${submission.contestId}/${submission.result as string}/${submission.userId}`;
}

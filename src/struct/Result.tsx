export enum Result {
  AC = 'AC',
  WRONG = 'OTHER',
  NODATA = 'NODATA',
}

export function createResult(verdict: string | Result): Result {
  return verdict === Result.AC ? Result.AC :
    verdict === Result.NODATA ? Result.NODATA :
    Result.WRONG;
}

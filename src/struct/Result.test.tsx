import { createResult, Result } from './Result';

test('createResult (parse verdict from text {AC, WA, ... }', () => {
  expect(createResult('AC')).toBe(Result.AC);
  expect(createResult('WA')).toBe(Result.WRONG);
  expect(createResult('TLE')).toBe(Result.WRONG);
  expect(createResult('MLE')).toBe(Result.WRONG);
  expect(createResult('RE')).toBe(Result.WRONG);
  expect(createResult('3/15')).toBe(Result.WRONG);
});

import { createResult, Result } from './Result';
import { createSubmission, equal, Submission } from './Submission';

test('compare Submissions : equal (AC)', () => {
  const a: Submission = {
    contestId: 'agc028',
    problemId: 'agc028_a',
    result: 'AC' as Result,
    userId: 'koyumeishi',
  };

  const b: Submission = createSubmission(
    'agc028',
    'agc028_a',
    'AC',
    'koyumeishi');

  expect(equal(a, b)).toBe(true);
});

test('compare Submissions : equal (WA, TLE)', () => {
  const a: Submission = {
    contestId: 'agc028',
    problemId: 'agc028_a',
    result: createResult('WA'),
    userId: 'koyumeishi',
  };

  const b: Submission = createSubmission(
    'agc028',
    'agc028_a',
    'TLE',
    'koyumeishi');

  expect(equal(a, b)).toBe(true);
});

test('compare Submissions : not equal (userId)', () => {
  const a: Submission = {
    contestId: 'agc028',
    problemId: 'agc028_a',
    result: 'AC' as Result,
    userId: 'hogehoge',
  };

  const b: Submission = createSubmission(
    'agc028',
    'agc028_a',
    'TLE',
    'koyumeishi');

  expect(equal(a, b)).toBe(false);
});

test('compare Submissions : not equal (verdict)', () => {
  const a: Submission = {
    contestId: 'agc028',
    problemId: 'agc028_a',
    result: Result.WRONG,
    userId: 'koyumeishi',
  };

  const b: Submission = createSubmission(
    'agc028',
    'agc028_a',
    'AC',
    'koyumeishi');

  expect(equal(a, b)).toBe(false);
});

test('compare Submissions : not equal (problem)', () => {
  const a: Submission = {
    contestId: 'agc028',
    problemId: 'agc028_a',
    result: 'AC' as Result,
    userId: 'koyumeishi',
  };

  const b: Submission = createSubmission(
    'agc028',
    'agc028_b',
    'AC',
    'koyumeishi');

  expect(equal(a, b)).toBe(false);
});

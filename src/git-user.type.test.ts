import assert from 'node:assert';
import test from 'node:test';
import { GitUser, GitUserUtil } from './git-user.type';

test('GitUser.ACTIONS_USER', () => {
  const original: string = 'Actions-User';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(x => {
    const parsed = GitUserUtil.parseOrNull(x);
    assert.strictEqual(parsed, GitUser.ACTIONS_USER);
  });
});

test('GitUser.GITHUB_ACTIONS', () => {
  const original: string = 'GitHub-Actions';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(x => {
    const parsed = GitUserUtil.parseOrNull(x);
    assert.strictEqual(parsed, GitUser.GITHUB_ACTIONS);
  });
});

test('GitUser.LATEST_COMMIT', () => {
  const original: string = 'Latest-Commit';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(x => {
    const parsed = GitUserUtil.parseOrNull(x);
    assert.strictEqual(parsed, GitUser.LATEST_COMMIT);
  });
});

test('GitUser.SPECIFIC', () => {
  const original: string = 'Specific';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(x => {
    const parsed = GitUserUtil.parseOrNull(x);
    assert.strictEqual(parsed, GitUser.SPECIFIC);
  });
});

test('None of GitUser', () => {
  const failCases = [
    'abcdefg',
    '',
    null,
    undefined,
  ];
  failCases.forEach(x => {
    const parsed = GitUserUtil.parseOrNull(x);
    assert.strictEqual(parsed, null);
  });
});

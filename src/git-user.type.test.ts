import assert from 'node:assert';
import test from 'node:test';
import { GitUser, GitUserUtil } from './git-user.type';

test('GitUserUtil.parseOrNull(ACTIONS_USER)', () => {
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

test('GitUserUtil.parseOrNull(GITHUB_ACTIONS)', () => {
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

test('GitUserUtil.parseOrNull(LATEST_COMMIT)', () => {
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

test('GitUserUtil.parseOrNull(SPECIFIC)', () => {
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

test('GitUserUtil.parseOrNull(None of GitUser)', () => {
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

test('GitUser.toTextForSelection', () => {
  const list = Object.values(GitUser);
  const target = GitUserUtil.toTextForSelection();

  list.forEach(item => {
    assert.strictEqual(target.includes(item), true);
  });
  assert.strictEqual(
    [...target].filter(x => x === ',').length,
    list.length - 2
  );
  assert.strictEqual(target.includes('or'), true);
});

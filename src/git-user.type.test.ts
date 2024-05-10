import assert from 'node:assert';
import test from 'node:test';
import { GitUserUtil } from './git-user.type';

test('GitUser.ACTIONS_USER', () => {
  const original: string = 'Actions-User';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(text => {
    assert.ok(GitUserUtil.is(text), `${text} is passed!`);
  });
});

test('GitUser.GITHUB_ACTIONS', () => {
  const original: string = 'GitHub-Actions';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(text => {
    assert.ok(GitUserUtil.is(text), `${text} is passed!`);
  });
});

test('GitUser.LATEST_COMMIT', () => {
  const original: string = 'Latest-Commit';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(text => {
    assert.ok(GitUserUtil.is(text), `${text} is passed!`);
  });
});

test('GitUser.SPECIFIC', () => {
  const original: string = 'Specific';
  const successCases = [
    original,
    original.toLowerCase(),
    original.toUpperCase(),
  ];
  successCases.forEach(text => {
    assert.ok(GitUserUtil.is(text), `${text} is passed!`);
  });
});

test('None of GitUser', () => {
  const failCases = [
    '',
    null,
    undefined,
  ];
  failCases.forEach(text => {
    assert.strictEqual(GitUserUtil.is(text), false);
  });
});

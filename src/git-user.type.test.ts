import assert from 'node:assert';
import test from 'node:test';
import { GitUser, GitUserUtil } from './git-user.type';

test('GitUserUtil.parseOrNull', async context => {
  const fxTest = (text: string, type: GitUser) => context.test(type, () => {
    const successCases = [
      text,
      text.toLowerCase(),
      text.toUpperCase(),
    ];
    successCases.forEach(x => {
      const parsed = GitUserUtil.parseOrNull(x);
      assert.strictEqual(parsed, type);
    });
  });
  await fxTest('Actions-User', GitUser.ACTIONS_USER);
  await fxTest('GitHub-Actions', GitUser.GITHUB_ACTIONS);
  await fxTest('Latest-Commit', GitUser.LATEST_COMMIT);
  await fxTest('Specific', GitUser.SPECIFIC);

  await context.test('none', () => {
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

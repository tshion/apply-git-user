import assert from 'node:assert';
import test from 'node:test';
import { GitCommandBuilder } from './git-command';

test('GitCommandBuilder.isGlobal', () => {
  const globalCommand = new GitCommandBuilder(true, '').forActionsUser();
  assert.ok(globalCommand.commandUserEmail.includes('--global'));
  assert.ok(globalCommand.commandUserName.includes('--global'));

  const localCommand = new GitCommandBuilder(false, '').forActionsUser();
  assert.ok(localCommand.commandUserEmail.includes('--local'));
  assert.ok(localCommand.commandUserName.includes('--local'));
});

test('GitCommandBuilder.path', () => {
  const path = '..';
  assert.strictEqual(
    new GitCommandBuilder(false, path).forActionsUser().options?.cwd,
    path,
  );

  assert.strictEqual(
    new GitCommandBuilder(false, '').forActionsUser().options?.cwd,
    undefined,
  );
});


test('GitCommandBuilder.forActionsUser', () => {
  assert.doesNotThrow(() => new GitCommandBuilder(false, '').forActionsUser());
});

test('GitCommandBuilder.forGitHubActions', () => {
  assert.doesNotThrow(() => new GitCommandBuilder(false, '').forGitHubActions());
});

test('GitCommandBuilder.forLatestCommit', () => {
  assert.doesNotThrow(() => new GitCommandBuilder(false, '').forLatestCommit());
});

test('GitCommandBuilder.forSpecific', () => {
  const builder = new GitCommandBuilder(false, '');
  assert.throws(() => builder.forSpecific('', ''));
  assert.throws(() => builder.forSpecific('email', ''));
  assert.throws(() => builder.forSpecific('', 'name'));
  assert.doesNotThrow(() => builder.forSpecific('email', 'name'));
});

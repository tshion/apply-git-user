import { ExecOptions, ExecOutput } from '@actions/exec';
import test from 'node:test';
import { ExecUtil } from './exec-util';
import assert from 'node:assert';

test('Success: ExecUtil.setupGitUser', async context => {
  const $exec = context.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
    return Promise.resolve(0);
  });

  assert.strictEqual($exec.mock.callCount(), 0);
  await ExecUtil.setupGitUser(false, '', 'email', 'name');
  assert.strictEqual($exec.mock.callCount(), 2);
});

test('Fail: ExecUtil.setupGitUser', async context => {
  const $exec = context.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
    return Promise.reject();
  });

  assert.rejects(ExecUtil.setupGitUser(false, '', '', ''));
  assert.rejects(ExecUtil.setupGitUser(false, '', 'email', ''));
  assert.rejects(ExecUtil.setupGitUser(false, '', '', 'name'));
  assert.strictEqual($exec.mock.callCount(), 0);

  assert.rejects(ExecUtil.setupGitUser(false, '', 'email', 'name'));
  assert.strictEqual($exec.mock.callCount(), 1);
});


test('Success: ExecUtil.setupGitUserByCommit', async context => {
  const testOutput: ExecOutput = {
    exitCode: 0,
    stdout: 'value',
    stderr: '',
  };
  const $getExecOutput = context.mock.method(ExecUtil, '_getExecOutput', (commandLine: string, args?: string[], options?: ExecOptions) => {
    return Promise.resolve(testOutput);
  });
  const $setupGitUser = context.mock.method(ExecUtil, 'setupGitUser', (isGlobal: boolean, path: string, userEmail: string, userName: string) => {
    assert.strictEqual(userEmail, testOutput.stdout);
    assert.strictEqual(userName, testOutput.stdout);
    return Promise.resolve();
  });

  assert.strictEqual($getExecOutput.mock.callCount(), 0);
  assert.strictEqual($setupGitUser.mock.callCount(), 0);
  await ExecUtil.setupGitUserByCommit(false, '');
  assert.strictEqual($getExecOutput.mock.callCount(), 2);
  assert.strictEqual($setupGitUser.mock.callCount(), 1);
});

test('Fail: ExecUtil.setupGitUserByCommit', async context => {
  const testOutput: ExecOutput = {
    exitCode: 1,
    stdout: '',
    stderr: 'error',
  };
  const $getExecOutput = context.mock.method(ExecUtil, '_getExecOutput', (commandLine: string, args?: string[], options?: ExecOptions) => {
    return Promise.resolve(testOutput);
  });
  const $setupGitUser = context.mock.method(ExecUtil, 'setupGitUser', (isGlobal: boolean, path: string, userEmail: string, userName: string) => {
    return Promise.resolve();
  });

  assert.strictEqual($getExecOutput.mock.callCount(), 0);
  assert.strictEqual($setupGitUser.mock.callCount(), 0);
  assert.rejects(ExecUtil.setupGitUserByCommit(false, ''));
  assert.strictEqual($getExecOutput.mock.callCount(), 1);
  assert.strictEqual($setupGitUser.mock.callCount(), 0);
});

import { ExecOptions, ExecOutput } from '@actions/exec';
import assert from 'node:assert';
import test from 'node:test';
import { ExecUtil } from './exec-util';

test('ExecUtil.setupGitUser', async context => {
  await context.test(`Reject 'exec'`, async c => {
    const $exec = c.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
      return Promise.reject();
    });
    assert.rejects(ExecUtil.setupGitUser(false, '', 'email', 'name'));
    assert.strictEqual($exec.mock.callCount(), 1);
  });

  await context.test('isGlobal: true', async c => {
    const $exec = c.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
      assert.ok(args?.includes('--global'));
      return Promise.resolve(0);
    });
    assert.strictEqual($exec.mock.callCount(), 0);
    await ExecUtil.setupGitUser(true, '', 'email', 'name');
    assert.strictEqual($exec.mock.callCount(), 2);
  });

  await context.test('isGlobal: false', async c => {
    const $exec = c.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
      assert.ok(args?.includes('--local'));
      return Promise.resolve(0);
    });
    assert.strictEqual($exec.mock.callCount(), 0);
    await ExecUtil.setupGitUser(false, '', 'email', 'name');
    assert.strictEqual($exec.mock.callCount(), 2);
  });

  await context.test(`path: ''`, async c => {
    const tPath = '';
    const $exec = c.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
      assert.strictEqual(options, undefined);
      return Promise.resolve(0);
    });
    assert.strictEqual($exec.mock.callCount(), 0);
    await ExecUtil.setupGitUser(false, tPath, 'email', 'name');
    assert.strictEqual($exec.mock.callCount(), 2);
  });

  await context.test(`path: './test/'`, async c => {
    const tPath = './test/';
    const $exec = c.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
      assert.notStrictEqual(options, undefined);
      assert.strictEqual(options?.cwd, tPath);
      return Promise.resolve(0);
    });
    assert.strictEqual($exec.mock.callCount(), 0);
    await ExecUtil.setupGitUser(false, tPath, 'email', 'name');
    assert.strictEqual($exec.mock.callCount(), 2);
  });

  await context.test('user*: lacked', async c => {
    const $exec = c.mock.method(ExecUtil, '_exec', (commandLine: string, args?: string[], options?: ExecOptions) => {
      return Promise.resolve(0);
    });

    assert.rejects(ExecUtil.setupGitUser(false, '', '', ''));
    assert.rejects(ExecUtil.setupGitUser(false, '', 'email', ''));
    assert.rejects(ExecUtil.setupGitUser(false, '', '', 'name'));
    assert.strictEqual($exec.mock.callCount(), 0);
  });
});

test('ExecUtil.setupGitUserByCommit', async context => {
  await context.test(`Reject 'getExecOutput'`, async c => {
    const $getExecOutput = c.mock.method(ExecUtil, '_getExecOutput', (commandLine: string, args?: string[], options?: ExecOptions) => {
      return Promise.reject();
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

  await context.test(`'getExecOutput' with error code`, async c => {
    const testOutput: ExecOutput = {
      exitCode: 1,
      stdout: '',
      stderr: 'error',
    };
    const $getExecOutput = c.mock.method(ExecUtil, '_getExecOutput', (commandLine: string, args?: string[], options?: ExecOptions) => {
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

  await context.test(`bypass to 'setupGitUser'`, async c => {
    const tIsGlobal = true;
    const tPath = './test/';
    const testOutput: ExecOutput = {
      exitCode: 0,
      stdout: 'value',
      stderr: '',
    };
    const $getExecOutput = c.mock.method(ExecUtil, '_getExecOutput', (commandLine: string, args?: string[], options?: ExecOptions) => {
      assert.notStrictEqual(options, undefined);
      assert.strictEqual(options?.cwd, tPath);
      return Promise.resolve(testOutput);
    });
    const $setupGitUser = context.mock.method(ExecUtil, 'setupGitUser', (isGlobal: boolean, path: string, userEmail: string, userName: string) => {
      assert.strictEqual(isGlobal, tIsGlobal);
      assert.strictEqual(path, tPath);
      assert.strictEqual(userEmail, testOutput.stdout);
      assert.strictEqual(userName, testOutput.stdout);
      return Promise.resolve();
    });

    assert.strictEqual($getExecOutput.mock.callCount(), 0);
    assert.strictEqual($setupGitUser.mock.callCount(), 0);
    await ExecUtil.setupGitUserByCommit(tIsGlobal, tPath);
    assert.strictEqual($getExecOutput.mock.callCount(), 2);
    assert.strictEqual($setupGitUser.mock.callCount(), 1);
  });

  await context.test(`path: ''`, async c => {
    const tPath = '';
    const testOutput: ExecOutput = {
      exitCode: 0,
      stdout: 'value',
      stderr: '',
    };
    const $getExecOutput = c.mock.method(ExecUtil, '_getExecOutput', (commandLine: string, args?: string[], options?: ExecOptions) => {
      assert.strictEqual(options, undefined);
      return Promise.resolve(testOutput);
    });
    const $setupGitUser = context.mock.method(ExecUtil, 'setupGitUser', (isGlobal: boolean, path: string, userEmail: string, userName: string) => {
      return Promise.resolve();
    });

    assert.strictEqual($getExecOutput.mock.callCount(), 0);
    assert.strictEqual($setupGitUser.mock.callCount(), 0);
    await ExecUtil.setupGitUserByCommit(false, tPath);
    assert.strictEqual($getExecOutput.mock.callCount(), 2);
    assert.strictEqual($setupGitUser.mock.callCount(), 1);
  });
});

import { ExecOptions, exec, getExecOutput } from '@actions/exec';

/**
 * {@link exec} を使った処理のユーティリティ
 */
export class ExecUtil {

  /** Wrap {@link exec} for test. */
  public static _exec(commandLine: string, args?: string[], options?: ExecOptions) {
    return exec(commandLine, args, options);
  }

  /** Wrap {@link getExecOutput} for test. */
  public static _getExecOutput(commandLine: string, args?: string[], options?: ExecOptions) {
    return getExecOutput(commandLine, args, options);
  }


  public static async setupGitUser(
    isGlobal: boolean,
    path: string,
    userEmail: string,
    userName: string,
  ) {
    if (!userEmail || !userName) {
      throw Error('Please set email and name.');
    }

    const args = [
      'config',
      isGlobal ? '--global' : '--local',
    ];
    const options = !!path ? { cwd: path } : undefined;

    await this._exec('git', [...args, 'user.email', userEmail], options);
    await this._exec('git', [...args, 'user.name', userName], options);
  }

  public static async setupGitUserByCommit(
    isGlobal: boolean,
    path: string,
  ) {
    const args = [
      '--no-pager',
      'log',
      '-n 1',
    ];
    const options = !!path ? { cwd: path } : undefined;

    const resultEmail = await this._getExecOutput('git', [...args, `--format=format:'%ae'`], options);
    if (resultEmail.exitCode !== 0) {
      throw new Error(resultEmail.stderr);
    }

    const resultName = await this._getExecOutput('git', [...args, `--format=format:'%an'`], options);
    if (resultName.exitCode !== 0) {
      throw new Error(resultName.stderr);
    }

    return this.setupGitUser(isGlobal, path, resultEmail.stdout, resultName.stdout);
  }
}

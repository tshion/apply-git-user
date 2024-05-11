/**
 * (型エイリアス) 実行するGit コマンド情報
 */
export type GitCommand = {
  commandLine: string,
  argsUserEmail: string[],
  argsUserName: string[],
  options?: { cwd?: string },
};


/**
 * 実行するGit コマンド情報の構築
 */
export class GitCommandBuilder {

  public constructor(
    private readonly isGlobal: boolean,
    private readonly path: string,
  ) {
  }


  public forActionsUser() {
    return this.forSpecific(
      '65916846+actions-user@users.noreply.github.com',
      'actions-user',
    );
  }

  public forGitHubActions() {
    return this.forSpecific(
      '41898282+github-actions[bot]@users.noreply.github.com',
      'github-actions[bot]',
    );
  }

  public forLatestCommit() {
    return this.forSpecific(
      `"$(git --no-pager log --format=format:'%ae' -n 1)"`,
      `"$(git --no-pager log --format=format:'%an' -n 1)"`,
    );
  }

  public forSpecific(email: string, name: string): GitCommand {
    if (!email || !name) {
      throw Error('Please set email and name.');
    }

    const args = [
      'config',
      this.isGlobal ? '--global' : '--local',
    ];
    return {
      commandLine: 'git',
      argsUserEmail: [...args, 'user.email', email],
      argsUserName: [...args, 'user.name', name],
      options: !!this.path ? { cwd: this.path } : undefined,
    };
  }
}

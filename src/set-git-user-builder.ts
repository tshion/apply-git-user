import { ExecUtil } from './exec-util';

/**
 * Git ユーザーを設定する際の情報構築
 */
export class SetGitUserBuilder {

  public constructor(
    private readonly isGlobal: boolean,
    private readonly path: string,
  ) {
  }


  public forActionsUser() {
    return ExecUtil.setupGitUser(
      this.isGlobal,
      this.path,
      '65916846+actions-user@users.noreply.github.com',
      'actions-user',
    );
  }

  public forGitHubActions() {
    return ExecUtil.setupGitUser(
      this.isGlobal,
      this.path,
      '41898282+github-actions[bot]@users.noreply.github.com',
      'github-actions[bot]',
    );
  }

  public forLatestCommit() {
    return ExecUtil.setupGitUserByCommit(
      this.isGlobal,
      this.path,
    );
  }

  public forSpecific(email: string, name: string) {
    return ExecUtil.setupGitUser(
      this.isGlobal,
      this.path,
      email,
      name,
    );
  }
}

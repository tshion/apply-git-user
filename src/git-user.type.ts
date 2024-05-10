/**
 * Git ユーザーの種別
 */
export const GitUser = {
  ACTIONS_USER: 'actions-user',
  GITHUB_ACTIONS: 'github-actions',
  LATEST_COMMIT: 'latest-commit',
  SPECIFIC: 'specific',
} as const;

/**
 * (型エイリアス) Git ユーザーの種別
 */
export type GitUser = typeof GitUser[keyof typeof GitUser];

/**
 * (ユーティリティー) Git ユーザーの種別
 */
export class GitUserUtil {

  private static get values() {
    return Object.values(GitUser);
  }


  /** `GitUser` かどうか */
  public static is(value: unknown): value is GitUser {
    const text = `${value}`.toLowerCase();
    return this.values.some(x => x === text);
  }
}

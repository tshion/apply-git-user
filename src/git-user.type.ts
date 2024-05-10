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

  private static values = Object.values(GitUser);


  /** `GitUser` への変換。失敗時は `null` */
  public static parseOrNull(value: unknown): GitUser | null {
    const text = `${value}`.toLowerCase();
    return this.values.find(x => x === text) ?? null;
  }
}

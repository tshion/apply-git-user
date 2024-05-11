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


  /** `GitUser` への変換。失敗時は `null` */
  public static parseOrNull(value: unknown): GitUser | null {
    const text = `${value}`.toLowerCase();
    return this.values.find(x => x === text) ?? null;
  }

  /** 選択肢用のテキストへ変換 */
  public static toTextForSelection() {
    const list = GitUserUtil.values.map(x => `'${x}'`);
    const lastItem = list.pop()!;
    return `${list.join(', ')} or ${lastItem}`;
  }
}

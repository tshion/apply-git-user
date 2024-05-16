import * as core from '@actions/core';
import { GitUser, GitUserUtil } from './git-user.type';
import { SetGitUserBuilder } from './set-git-user-builder';

+async function () {
  try {
    const user = GitUserUtil.parseOrNull(core.getInput('user', { required: true }));
    if (!user) {
      throw Error(`Please set 'user' to either ${GitUserUtil.toTextForSelection()}.`);
    }

    const builder = new SetGitUserBuilder(
      core.getBooleanInput('global'),
      core.getInput('path'),
    );
    let promise: Promise<void>;
    switch (user) {
      case GitUser.ACTIONS_USER:
        promise = builder.forActionsUser();
        break;
      case GitUser.GITHUB_ACTIONS:
        promise = builder.forGitHubActions();
        break;
      case GitUser.LATEST_COMMIT:
        promise = builder.forLatestCommit();
        break;
      case GitUser.SPECIFIC:
        promise = builder.forSpecific(
          core.getInput('email'),
          core.getInput('name'),
        );
        break;
    }
    await promise;
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}();

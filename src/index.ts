import * as core from '@actions/core';
import { exec } from '@actions/exec';
import { GitCommand, GitCommandBuilder } from './git-command';
import { GitUser, GitUserUtil } from './git-user.type';

+async function () {
  try {
    const user = GitUserUtil.parseOrNull(core.getInput('user', { required: true }));
    if (!user) {
      throw Error(`Please set 'user' to either ${GitUserUtil.toTextForSelection()}.`);
    }

    const builder = new GitCommandBuilder(
      core.getBooleanInput('global'),
      core.getInput('path'),
    );
    let gitCommand: GitCommand;
    switch (user) {
      case GitUser.ACTIONS_USER:
        gitCommand = builder.forActionsUser();
        break;
      case GitUser.GITHUB_ACTIONS:
        gitCommand = builder.forGitHubActions();
        break;
      case GitUser.LATEST_COMMIT:
        gitCommand = builder.forLatestCommit();
        break;
      case GitUser.SPECIFIC:
        gitCommand = builder.forSpecific(
          core.getInput('email'),
          core.getInput('name'),
        );
        break;
    }

    await exec(`"${gitCommand.commandUserEmail}"`, undefined, gitCommand.options);
    await exec(`"${gitCommand.commandUserName}"`, undefined, gitCommand.options);
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}();

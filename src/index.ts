import core from '@actions/core';
import { exec } from '@actions/exec';
import { GitUser, GitUserUtil } from './git-user.type';

+async function () {
  try {
    const inputPath = core.getInput('path');

    const user = GitUserUtil.parseOrNull(core.getInput('user', { required: true }));
    if (!user) {
      throw Error(`Please set 'user' to either ${GitUserUtil.toTextForSelection()}.`);
    }

    let email = '';
    let name = '';
    switch (user) {
      case GitUser.ACTIONS_USER:
        email = '65916846+actions-user@users.noreply.github.com';
        name = 'actions-user';
        break;
      case GitUser.GITHUB_ACTIONS:
        email = '41898282+github-actions[bot]@users.noreply.github.com';
        name = 'github-actions[bot]';
        break;
      case GitUser.LATEST_COMMIT:
        await exec(
          `git --no-pager log --format=format:'%ae' -n 1`,
          undefined,
          {
            cwd: inputPath,
            listeners: {
              stdout(data) {
                email = data.toString();
              },
            }
          },
        );
        await exec(
          `git --no-pager log --format=format:'%an' -n 1`,
          undefined,
          {
            cwd: inputPath,
            listeners: {
              stdout(data) {
                name = data.toString();
              },
            }
          },
        );
        break;
      case GitUser.SPECIFIC:
        email = core.getInput('email');
        name = core.getInput('name');
        break;
    }
    if (!email || !name) {
      throw Error('User not found');
    }

    const gitFlag = core.getBooleanInput('global') ? '--global' : '--local';
    await exec(`git config ${gitFlag} user.email ${email}`, [], { cwd: inputPath });
    await exec(`git config ${gitFlag} user.name ${name}`, [], { cwd: inputPath });
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}();

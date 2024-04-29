# apply-git-user (for GitHub Actions)
Apply a well-known git user to `git config user.*`.

* actions-user
* github-actions
* (Latest git commit user)



## Usage
### Basic
``` yaml
- uses: tshion/apply-git-user@(version)
  with:
    user: (git user)
```

Replace `(git user)` with one of the following values.

`(git user)` | User | Description
--- | --- | ---
`actions-user` | ![actions-user](./docs/actions-user.png) | |
`github-actions` | ![github-actions](./docs/github-actions.png) | |
`latest-commit` | ![Latest git commit user](./docs/latest-commit.png) | Latest git commit user

### Use `working directory`
``` yaml
- uses: actions/checkout@v4
  with:
    path: from

- uses: tshion/apply-git-user@(version)
  with:
    path: from
    user: (git user)
```

### Use `git config --global user.*`
``` yaml
- uses: tshion/apply-git-user@(version)
  with:
    global: true
    user: (git user)
```



## References
* https://github.com/actions/checkout/issues/13#issuecomment-724415212

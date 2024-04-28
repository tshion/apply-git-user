# apply-git-user (for GitHub Actions)
Apply a well-known git user to `git config user.*`.

User | Sample image
--- | :---:
actions-user | ![actions-user](./docs/actions-user.png)
github-actions | ![github-actions](./docs/github-actions.png)
(Latest git commit user) | ![Latest git commit user](./docs/latest-commit.png)



## Usage
### Basic
``` yaml
- uses: tshion/apply-git-user@(version)
  with:
    user: (placeholder)
```

Replace `(placeholder)` with one of the following values.

* `actions-user`
* `github-actions`
* `latest-commit`

### Use `working directory`
``` yaml
- uses: actions/checkout@v4
  with:
    path: from

- uses: tshion/apply-git-user@(version)
  with:
    path: from
    user: (placeholder)
```

### Use `git config --global user.*`
``` yaml
- uses: tshion/apply-git-user@(version)
  with:
    global: true
    user: (placeholder)
```



## References
* https://github.com/actions/checkout/issues/13#issuecomment-724415212

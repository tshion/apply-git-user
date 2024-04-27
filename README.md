# apply-git-user (for GitHub Actions)
Apply a well-known git user to `git config user.*`.

* actions-user
* github-actions
* (Latest git commit user)



## Usage
### Basic
``` yaml
- uses: tshion/apply-git-user@v1
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

- uses: tshion/apply-git-user@v1
  with:
    path: from
    user: (placeholder)
```

### Use `git config --global user.*`
``` yaml
- uses: tshion/apply-git-user@v1
  with:
    global: true
    user: (placeholder)
```



## References
* https://github.com/actions/checkout/issues/13#issuecomment-724415212

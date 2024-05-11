# apply-git-user (for GitHub Actions)
Apply a well-known git user to `git config user.*`.

* actions-user
* github-actions
* (Latest git commit user)
* (Specific user)



## Usage
### Basic
``` yaml
- uses: tshion/apply-git-user@(version)
  with:
    user: (git user)
    email: (git user email) # Set if `user` is `specific`
    name: (git user name) # Set if `user` is `specific`
```

Replace `(git user)` with one of the following values.

`(git user)` | User | Description
--- | --- | ---
`actions-user` | ![actions-user](./docs/actions-user.png) | |
`github-actions` | ![github-actions](./docs/github-actions.png) | |
`latest-commit` | e.g. ![latest commit](./docs/user.png) | Latest git commit user
`specific` | e.g. ![specific](./docs/user.png) | Set up a specific user by `(git user email)` and `(git user name)`.

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



## Notes
* If you want to know node-version, see [.node-version](./.node-version)
* If you wish to develop this, see [CONTRIBUTING.md](./docs/CONTRIBUTING.md)



## References
* https://github.com/actions/checkout/issues/13#issuecomment-724415212

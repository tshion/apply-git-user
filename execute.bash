#!/bin/bash

cd $PATH_DIR
echo "path: $PATH_DIR"

EMAIL=''
NAME=''
if [ $USER = 'actions-user' ]; then
    EMAIL='65916846+actions-user@users.noreply.github.com'
    NAME='actions-user'
elif [ $USER = 'github-actions' ]; then
    EMAIL='41898282+github-actions[bot]@users.noreply.github.com'
    NAME='github-actions[bot]'
elif [ $USER = 'latest-commit' ]; then
    EMAIL="$(git --no-pager log --format=format:'%ae' -n 1)"
    NAME="$(git --no-pager log --format=format:'%an' -n 1)"
else
    echo "::error::Please set 'user' to either 'actions-user', 'github-actions' or 'latest-commit'."
    exit 1
fi
echo "name: $NAME"
echo "email: $EMAIL"

FLAG='--local'
if [ $GLOBAL = 'true' ]; then
    FLAG='--global'
fi
echo "flag: $FLAG"

git config $FLAG user.email $EMAIL
git config $FLAG user.name $NAME

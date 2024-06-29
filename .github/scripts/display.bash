#!/bin/bash

echo "path: $(pwd)"
echo "Local: $(git config --local user.name) <$(git config --local user.email)>"
echo "Global: $(git config --global user.name) <$(git config --global user.email)>"

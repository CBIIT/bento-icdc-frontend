#!/bin/bash
# scripts/check-branch.sh
# This script checks if the branch name follows the Gitflow naming conventions.

# Get the current branch name
branch_name=$(git rev-parse --abbrev-ref HEAD)

# Define regex patterns for branch types based on the Gitflow strategy
main_branch="^main$"
develop_branch="^develop$"
feature_branch="^feature\/[a-zA-Z0-9_-]+$"
bugfix_branch="^bugfix\/[a-zA-Z0-9_-]+$"
release_branch="^release\/[0-9]+(\.[0-9]+)*$"
release_build_branch="^[0-9]+\.[0-9]+\.[0-9]+\.build$"
hotfix_branch="^hotfix\/[a-zA-Z0-9_-]+$"

# Check if the branch name matches any of the valid patterns
if [[ $branch_name =~ $main_branch || $branch_name =~ $develop_branch || $branch_name =~ $feature_branch || $branch_name =~ $bugfix_branch || $branch_name =~ $release_branch || $branch_name =~ $hotfix_branch || $branch_name =~ $release_build_branch]]; then
  echo "✅ Branch name '$branch_name' is valid."
  exit 0
else
  echo "❌ Invalid branch name '$branch_name'."
  echo "Please follow the branch naming conventions:"
  #echo "- main"
  #echo "- develop"
  echo "- feature/<issue-id>"
  echo "- bugfix/<issue-id>"
  echo "- release/<version>"
  echo "- hotfix/<issue-id>"
  echo "- <version>.build"
  echo "where <issue-id> can be alphanumeric (letters, numbers, hyphens, or underscores)."
  echo "example feature/ICDC-2555"
  exit 1
fi
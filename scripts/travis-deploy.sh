#!/bin/bash -e

GITHUB_URL="https://${GITHUB_TOKEN}@github.com/gberaudo/mytracks.git"

# Cloning gh-pages into a local temporary directory
TMP=".${GITHUB_USERNAME}-gh-pages"
rm -rf ${TMP}
git clone --single-branch --branch gh-pages ${GITHUB_URL} ${TMP}

pushd ${TMP}
git rm --ignore-unmatch -r --quiet --force ${TRAVIS_BRANCH} || true
popd

cp -r dist ${TMP}/${TRAVIS_BRANCH}

# Rewrite last commit and force push
pushd ${TMP}
git add -A
git commit --quiet --amend --message="Master automatic deploy"
git push origin gh-pages -f
popd

# Cleanup
rm -rf ${TMP}

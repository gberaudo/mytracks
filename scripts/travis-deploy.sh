#!/bin/bash -e

GITHUB_URL="https://${GITHUB_TOKEN}@github.com/gberaudo/mytracks.git"

# Cloning gh-pages into a local temporary directory
TMP="tmp.${GITHUB_USERNAME}-gh-pages"
rm -rf ${TMP}
git clone --single-branch --branch gh-pages ${GITHUB_URL} ${TMP}

pushd ${TMP}
git rm --ignore-unmatch -r --quiet --force releases/${TRAVIS_BRANCH} || true
popd

mkdir -p ${TMP}/releases
cp -r dist/mytracks ${TMP}/releases/${TRAVIS_BRANCH}
sed -i 'sYbase href="/"Ybase href="/mytracks/releases/'${TRAVIS_BRANCH}/'"Y' ${TMP}/releases/${TRAVIS_BRANCH}/index.html

cp -R dist/apidoc ${TMP}/releases/${TRAVIS_BRANCH}/

# Rewrite last commit and force push
pushd ${TMP}
git add -A
git commit --quiet --amend --message="Master automatic deploy"
git push origin gh-pages -f
popd

# Cleanup
rm -rf ${TMP}

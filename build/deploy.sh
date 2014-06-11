#!/bin/sh
set -e -x
git --version
upstream=$1
: ${upstream:=origin}
: ${REPO:=git@github.com:appleboy/js-video-player}
git fetch $upstream
if [ `git rev-list HEAD...$upstream/master --count` -ne 0 ]; then
echo "not deploying"
  exit 1
fi

npm i

# XXX: use --reference when not in shallow clone
#git clone $REPO --reference . -b gh-pages _public
git clone $REPO --depth 1 -b gh-pages _public

cd _public
git fetch --depth 1 origin master:master
git add -A .
echo "regen for $REV" | git commit-tree `git write-tree` -p `git rev-parse HEAD` -p $REV | xargs git reset --hard
git push origin gh-pages -f

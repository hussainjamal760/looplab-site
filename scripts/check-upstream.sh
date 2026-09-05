#!/usr/bin/env bash
#
# check-upstream — report whether this checkout is behind its upstream.
#
# Usage:
#   bash scripts/check-upstream.sh [<remote>/<branch>]
#
# With no arguments it checks the current branch against its configured
# upstream (e.g. origin/main). Pass e.g. "origin/main" to check a
# specific branch instead.
#
# Exit codes:
#   0  up to date — no new upstream commits
#   1  new upstream commits are available (run `git pull` to get them)
#   2  repository / upstream configuration problem
#   3  fetch failed
#
# Read-only: it never modifies the working tree or writes commits. The
# only side effect is updating remote-tracking refs via `git fetch`.

set -euo pipefail

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "error: not inside a git repository" >&2
  exit 2
}

TARGET="${1:-}"

if [[ -z "$TARGET" ]]; then
  if ! git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    echo "error: the current branch has no upstream configured" >&2
    echo "usage: $0 [<remote>/<branch>]  (e.g. $0 origin/main)" >&2
    exit 2
  fi
  TARGET='@{u}'
fi

UPSTREAM_REF=$(git rev-parse --abbrev-ref --symbolic-full-name "$TARGET" 2>/dev/null) || {
  echo "error: unknown target '$TARGET'" >&2
  exit 2
}

REMOTE="${UPSTREAM_REF%%/*}"

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "error: no git remote named '$REMOTE'" >&2
  exit 2
fi

if ! git fetch "$REMOTE" 2>&1; then
  echo "error: 'git fetch $REMOTE' failed — check your network/credentials" >&2
  exit 3
fi

NEW_COMMITS=$(git rev-list --count HEAD.."$UPSTREAM_REF")

if [[ "$NEW_COMMITS" -gt 0 ]]; then
  LOCAL_SHORT=$(git rev-parse --short HEAD)
  echo "Upstream $UPSTREAM_REF has $NEW_COMMITS new commit(s) since your last sync (HEAD $LOCAL_SHORT):"
  echo
  git log --oneline --no-decorate HEAD.."$UPSTREAM_REF"
  echo
  echo "Run 'git pull' to update."
  exit 1
fi

echo "Up to date with $UPSTREAM_REF — 0 new commits."
exit 0

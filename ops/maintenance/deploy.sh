#!/usr/bin/env bash
# Deploys the current HEAD of the Foundation repo to Hostinger (Node.js web app).
# Credentials are injected by the environment proxy; the Bearer value below is a placeholder.
set -euo pipefail
REPO=$(git rev-parse --show-toplevel); H=$(git -C "$REPO" rev-parse --short HEAD)
# Never deploy duplicate records or images.
node "$REPO/scripts/ops/check-duplicates.mjs" || { echo "deploy stopped: duplicates found"; exit 1; }
W=$(mktemp -d)
git clone -q --depth 1 -b hostinger-archive https://github.com/gflspace/Foundation.git "$W/d"
git -C "$REPO" archive --format=zip -o "$W/d/app.zip" HEAD
cd "$W/d" && git add app.zip
git -c user.name="SEF maintenance" -c user.email="admin@syndyemadefoundation.org" commit -q -m "Deploy $H" || true
for i in 1 2 3; do timeout 180 git push -q origin hostinger-archive && break; sleep 5; done
# Hostinger website to deploy to (change when the site moves to its real domain).
SITE_DOMAIN=${SITE_DOMAIN:-darkslateblue-lapwing-351030.hostingersite.com}
B=https://developers.hostinger.com/api/hosting/v1/accounts/u671799052/websites/$SITE_DOMAIN
A='Authorization: Bearer placeholder'
for i in 1 2 3 4 5 6; do r=$(curl -sS -X POST "$B/git/repositories/deploy" -H "$A" -H 'Content-Type: application/json' -d '{"repository_url":"https://github.com/gflspace/Foundation.git","branch":"hostinger-archive","directory":"_deploy"}'); echo "$r" | grep -q '"is_success":true' && ok=1 && break; sleep $((i*10)); done
[ "${ok:-0}" = 1 ] || { echo "git deploy failed: $(echo "$r" | head -c 400)"; exit 1; }
sleep 20
id=$(curl -sS -X POST "$B/nodejs/builds" -H "$A" -H 'Content-Type: application/json' -d '{"node_version":20,"app_type":"next","output_directory":".next","build_script":"build","package_manager":"npm","source_type":"archive","source_options":{"archive_path":"_deploy/app.zip"}}' | python3 -c "import sys,json;print(json.load(sys.stdin).get('uuid'))")
for i in $(seq 1 40); do s=$(curl -sS "$B/nodejs/builds/$id" -H "$A" | python3 -c "import sys,json;print(json.load(sys.stdin).get('state'))"); case $s in pending|running) sleep 15;; *) echo "deploy $H: $s"; [ "$s" = completed ]; exit;; esac; done
echo "deploy $H: timeout"; exit 1

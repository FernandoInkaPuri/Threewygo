#!/bin/bash
set -e

bin/setup

rm -f tmp/pids/server.pid
exec "$@"

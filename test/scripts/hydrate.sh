#!/bin/sh

if [ $# -lt 1 ]; then
    echo "Not enough arguments."
    exit;
fi

psql -h localhost -p 5444 -d tsumego_kai -U gillessed -f $1
#!/usr/bin/env bash

if [[ $1 = "--help" ]]; then
    echo "$0 [FILE] [COMMAND]"
    exit 0
fi

if [[ $# -ne 2 ]]; then
    echo "Expected two parameters"
    exit 1
fi

LTIME=`stat -c %Z $1`

echo $2
eval $2

while true
do
    ATIME=`stat -c %Z $1`

    if [[ "$ATIME" != "$LTIME" ]]
    then
        echo $2
        eval $2
        LTIME=$ATIME
    fi
    sleep 1
done

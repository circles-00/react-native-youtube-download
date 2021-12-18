#!/usr/bin/env bash

export DB_USER='postgres'
export DB_PASSWORD='manigli1'
export DB_HOST='localhost'
export DB_PORT='5432'
export DB_DATABASE='yt-download'

export NODE_ENV='development'

PS3='Select build type: '
options=("Local build" "Quit")
select option in "${options[@]}"
do
    case $option in
        "Local build")
            npm run dev
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
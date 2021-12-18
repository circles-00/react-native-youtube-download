#!/usr/bin/env bash

export DB_USER='*****'
export DB_PASSWORD='*****'
export DB_HOST='localhost'
export DB_PORT='5432'
export DB_DATABASE='*****'

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
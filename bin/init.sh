#!/bin/sh

#color codes, ALWAYS END WITH ESCAPE
red='\x1B[0;31m'
green='\x1B[0;32m'
blue='\x1B[0;34m'
white='\x1B[0;37m'
escape='\x1B[0m'

#Show responses for commands
showResponses() {
  #Check if it exited cleanly or threw errors
  if [[ "$1" -eq 0 ]]; then
    printf "$green done $escape \n"
  else
    printf "$red failed $escape \n"
    if [[ "$2" ]]; then #package not installed, installing
      printf "Installing $blue$2$escape... \n"
      case $2 in
        expo-cli)
          yarn install -g expo-cli
          ;;
        yarn)
          HOMEBREW_NO_AUTO_UPDATE=1 brew install $2
          ;;
      esac
    else
      exit 1;
    fi
  fi
}

printf "$white> Checking dependencies...\n$escape"
printf "$escape"
printf "Checking that $blue'yarn'$escape is installed..."
yarn -v &> /dev/null
showResponses $? yarn

printf "$escape"
printf "Checking that $blue'expo-cli'$escape is installed..."
expo-cli -V &> /dev/null
showResponses $? expo-cli

printf "$escape"
printf "\n$white> Updating node modules...\n$escape"
rm -rf node_modules/
yarn --frozen-lockfile

#!/bin/bash
# Check if user is root 
clear
if [[ $EUID -ne 0 ]]; then
   printf "This script must be run as root! Try sudo ./setup_contract.sh\n" 
   exit 1
fi
#Update system and cache
printf "Updating system..\n"
sudo apt-get update -y 1>/dev/null 
#1.Installation of necessary packages
printf "Installing necessary software...\n"
#Check if packages are installed or install them.
#Commands after || eval only if the previous command returned !0(failure)
#Commands after && eval only if the previous command returned 0(success)
#Install or upgrade Nodejs to get npm in the system
printf "*1)Installing NodeJS.."
sudo apt-get install nodejs -y >/dev/null 2>&1
if [ $? -ne 0 ]
then
 printf "\nError:Failed to install nodejs.\nPlease install nodejs manually from https://nodejs.org/\n" && exit 1
else
 printf "Done\n"
fi
#Check or install truffle 
printf "*2)Installing Truffle.."
npm install -g truffle >/dev/null 2>&1 || (printf "Error:Failed to install truffle.\nIs nodejs installed? Type node -v to find out\n" && exit 1)
printf "Done\n"
#Check or install ganache-cli
printf "*3)Installing Ganache.."
npm install -g ganache-cli >/dev/null 2>&1 || (printf "Error:Failed to install ganache-cli.\nIs nodejs installed?\nType node -v to find out\n" && exit 1)
printf "Done\n"
#Installing tmux
printf "*4)Installing tmux.."
sudo apt-get install tmux -y >/dev/null 2>&1
if [ $? -ne 0 ]
then
 printf "\nError:Failed to install tmux\n" && exit 1
else
 printf "Done\n"
fi
#2.Running the necessary programmes sillently
printf "*5)Running ganache blockchain\n"
#Create a tmux session with a random name
#Inspired by @earthgecko
session_id=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
tmux kill-session -t "$session_id" > /dev/null 2>&1
tmux new-session -d -s "$session_id"
#Run ganache and load database. This is our blockchain 
tmux send-keys -t "$session_id" 'ganache-cli --db chaindb/' C-m
#Detach from session
#Truffle compilation and migration of the contract. Not necessary because it's already been done
#tmux new-session -d -s truffle
#tmux send-keys -t truffle 'truffle comple && truffle develop' C-m
#tmux send-keyes -t truffle 'migrate' C-m
#truffle compile && truffle develop
#3.Running index.html
printf "Launching index.html. If it's not launched please open src/index.html in your browser\n"
sudo -u $SUDO_USER sensible-browser ./src/index.html 
#Trap Ctrl signal
#Ctrl+C
trap 'tmux kill-session -t '"$session_id"  SIGINT
read -p "Press any key to end the example..."
tmux kill-session -t "$session_id" > /dev/null 2>&1



#!/bin/bash
#

USER=$1
PASSWORD=$2
ADMIN=$3


if (( $# < 3));
then
    echo "Usage: ./ahcurl.sh <username> <password> <isAdmin [true|false]> <optional URL>";
    echo "Example: ./ahcurl.sh vader@nsa.gov vader true";
    echo "Example: ./ahcurl.sh vader@nsa.gov vader true localhost:92401";
    exit 1;
fi

HOST=colsp-dev.azurewebsites.net
read RAWCURL
REPLACE_HOST=$4
if (( $# == 4 ));
then
    echo Host being replaced with $REPLACE_HOST
    HOST=${HOST/colsp-dev.azurewebsites.net/$REPLACE_HOST}
else
    REPLACE_HOST=$HOST
fi

BODY=$(echo {\"email\": \"$USER\", \"password\": \"$PASSWORD\", \"isAdmin\": $ADMIN})
FULLCAT=$(echo curl -X POST -H \"Content-Type: application/json\" -H \"Cache-Control: no-cache\" -d \'$BODY\' \"http://$HOST/api/Users/Login\")
echo $FULLCAT
opt=$(eval $FULLCAT)
if (( $? > 0 ));
then
    echo Failed to get token from $HOST/Login
    exit 1;
fi
TOKEN=$(echo $opt | grep -oP 'Token\":\"\K([a-zA-Z0-9=]+)')
echo Ye token = $TOKEN


#RAWCURL=$*
echo RAW CURL = $RAWCURL

CURLTOKEN=$(echo $RAWCURL | grep -oP 'Bearer \K([a-zA-Z0-9=]+)')
echo CURL TOKEN $CURLTOKEN
REPCURL=${RAWCURL/$CURLTOKEN/$TOKEN}
IREPCURL=${REPCURL/colsp-dev.azurewebsites.net/$REPLACE_HOST}
echo $IREPCURL
echo "--------------------------- RESULT ----------------------------"
eval $IREPCURL

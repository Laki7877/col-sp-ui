# AhCurl
AhCurl script is a fundamental script that allows testing process to be simplified on the new Ahancer token-based authentication.
Usual process in testing `curl` command copied from Chrome involves 2 steps:

1. Obtain authentication token by hitting Login endpoint.
2. Run the `curl` command that you copied from Chrome's Network debugger.

AhCurl automatically does #1 for you. 

# Prerequisite
Bash (or git Bash in Windows)

# Usage
./ahcurl.sh <username> <password> <isAdmin [true|false]> <(optional) URL to replace Azure URL>";

# Examples:
## Hitting against Azure 
       
       ./ahcurl.sh vader@nsa.gov vader true 
      
Since the URL is not specified, it will hit `colsp-dev.azurewebsites.net`. 
Then it wil ask for CURL command, simply paste what Chrome gives you. Done!

## Hitting against localhost

        ./ahcurl.sh vader@nsa.gov vader true localhost:55059

Will automatically hit against local API.
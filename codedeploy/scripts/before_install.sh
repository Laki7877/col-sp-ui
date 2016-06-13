#!/bin/bash
# Force removing .env

if [ -f /var/www/.env ]; then
  rm /var/www/.env
fi

if [ -d /var/www/.sass-cache ]; then
  rm -rf /var/www/.sass-cache
fi

# Ensure PHP.ini parameters
sed -i -e '/^short_open_tag =/s/.*/short_open_tag = On/' /etc/php.ini
sed -i -e '/^error_reporting =/s/.*/error_reporting = ~E_ALL/' /etc/php.ini

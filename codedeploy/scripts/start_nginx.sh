#!/bin/bash
# enforce passive selinux
sudo setenforce permissive
sudo systemctl restart php-fpm.service
sudo systemctl start nginx.service

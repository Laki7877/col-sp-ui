#!/bin/bash
# enforce passive selinux
setenforce permissive
systemctl restart php-fpm.service
systemctl start nginx.service

#!/bin/bash
# enforce passive selinux
setenforce permissive
systemctl start nginx

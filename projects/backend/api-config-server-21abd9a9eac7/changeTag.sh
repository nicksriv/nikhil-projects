#!/bin/bash
sed "s/latest/$1/g" api-conifg-server-dev.yaml > config-server.yaml
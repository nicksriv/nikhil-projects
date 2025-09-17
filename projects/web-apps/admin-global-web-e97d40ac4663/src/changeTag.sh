#!/bin/bash
sed "s/latest/$1/g" v5-global-web.yaml > v5-global-web-dev.yaml
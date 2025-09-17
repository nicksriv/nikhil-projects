#!/bin/bash
sed "s/latest/$1/g" v5-global-uat.yaml > v5-global-web-uat.yaml

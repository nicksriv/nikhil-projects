#!/bin/bash
sed "s/latest/$1/g" v5-global-mobile.yaml > v5-global-mobile-dev.yaml

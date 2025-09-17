#!/bin/bash
sed "s/latest/$1/g" api-onboarding-uat.yaml > onboarding-uat.yaml

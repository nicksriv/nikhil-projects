#!/bin/bash
set -x;
#sed "s/latest/$1/g" api-onboarding-dev.yaml > onboarding-dev.yaml
sed "s/latest/$1/g" auditing-service-dev.yaml > auditingservice.yaml

#!/bin/bash

docker run \
  -it \
  -v $PWD:/e2e \
  -w /e2e \
  cypress/included:8.3.1

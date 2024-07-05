#!/bin/bash

# Terminal kapatıldığında npm sürecini sonlandır
trap 'kill $(jobs -p)' EXIT

# npm start komutunu çalıştır
npm start &
wait

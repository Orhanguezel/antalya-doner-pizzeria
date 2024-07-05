#!/bin/bash

# Terminal kapatıldığında node sürecini sonlandır
trap 'kill %1' SIGINT SIGTERM EXIT

# Node ile server.js dosyasını çalıştır
node server.js &
wait

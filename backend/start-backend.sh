#!/bin/bash

# 5000 numaralı portu serbest bırak
sudo kill-port 5000

# Backend'i başlat
npm start

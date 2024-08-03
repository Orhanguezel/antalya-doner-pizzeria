server {
    listen 80;
    server_name www.antalya-doner-pizzeria.de;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name www.antalya-doner-pizzeria.de;

    ssl_certificate /etc/letsencrypt/live/www.antalya-doner-pizzeria.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.antalya-doner-pizzeria.de/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


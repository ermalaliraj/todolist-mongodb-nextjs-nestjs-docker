### Nginx rules
    scp -r deploy/nginx/test/todolist-backend.conf root@95.211.222.xxx:/www/server/panel/vhost/nginx/
    scp -r deploy/nginx/test/todolist-frontend.conf root@95.211.222.xxx:/www/server/panel/vhost/nginx/
    ssh root@xxxxxx 
    sudo nginx -t
    sudo nginx -s reload
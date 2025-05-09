### Add nginx rule
    scp -r deploy/nginx/test/wr-api.conf root@95.211.222.xxx:/www/server/panel/vhost/nginx/
    ssh root@xxxxxx 
    sudo nginx -t
    sudo nginx -s reload

### nginx PRD
    scp -r deploy/nginx/prd/wr-api.conf root@95.211.222.xxx:/www/server/panel/vhost/nginx/

### Create Jenkins Pipeline **
    sh deploy/jenkins/test/deploy-site.sh
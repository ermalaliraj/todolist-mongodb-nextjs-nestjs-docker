docker stop $(docker ps -q)
docker rm $(docker ps -aq)
docker image prune -f
docker volume prune -f
docker network prune -f
docker volume prune -f
docker rmi todolist/frontend
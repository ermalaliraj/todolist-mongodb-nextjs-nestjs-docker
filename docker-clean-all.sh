#docker stop $(docker ps -q)
docker stop mongo elasticsearch kibana frontend

#docker rm $(docker ps -aq)
docker rm mongo elasticsearch kibana frontend

#docker image prune -f
docker rmi mongo:8.0.9 elasticsearch:7.17.9 kibana:7.17.9 todolist/frontend:latest

#docker volume prune -f
docker volume rm -f mongo-data es-data

#docker network prune -f
docker network rm -f todolist-net
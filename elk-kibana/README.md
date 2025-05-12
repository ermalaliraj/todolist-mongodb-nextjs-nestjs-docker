# ELK - Kibana

# Run
    cd elk-elasticsearch
	docker-compose up -d

# Connect (local vs remote)
	curl http://localhost:5601
    curl http://todolist.ermalaliraj.com:5601

# Health Checks
    -- 1. ELASTICSEARCH - send log
	curl -X POST http://todolist.ermalaliraj.com:9200/todolist/_doc -H 'Content-Type: application/json' -d '{
      "title": "Test ELK Integration2",
      "description": "Fully working example2",
      "isCompleted": false,
      "createdAt": "2025-05-09T11:00:00Z"
    }'

    -- 2. KIBANA - check the log in dashboard
    curl http://todolist.ermalaliraj.com:5601
    http://todolist.ermalaliraj.com:5601/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15y,to:now))&_a=(columns:!(),filters:!(),index:'732f8b20-2e37-11f0-975a-f9778a73efa7',interval:auto,query:(language:kuery,query:''),sort:!(!(createdAt,desc)))
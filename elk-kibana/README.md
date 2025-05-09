# ELK - Kibana

# Run
    cd elk-elasticsearch
	docker-compose up -d

# Connect
	curl http://localhost:5601
    curl http://kibana.ermalaliraj.com:5601

# Health Checks
    -- send log to elastic search
	curl -X POST http://localhost:9200/todolist/_doc -H 'Content-Type: application/json' -d '{
      "title": "Test ELK Integration2",
      "description": "Fully working example2",
      "isCompleted": false,
      "createdAt": "2025-05-09T11:00:00Z"
    }'

    -- check the log in Kibana dashboard
    curl http://localhost:5601

# Health Checks Remote
    -- send log to elastic search
	curl -X POST http://elastic.ermalaliraj.com:9200/todolist/_doc -H 'Content-Type: application/json' -d '{
      "title": "Test ELK Integration2",
      "description": "Fully working example2",
      "isCompleted": false,
      "createdAt": "2025-05-09T11:00:00Z"
    }'

    -- check the log in Kibana dashboard
    curl http://kibana.ermalaliraj.com:5601
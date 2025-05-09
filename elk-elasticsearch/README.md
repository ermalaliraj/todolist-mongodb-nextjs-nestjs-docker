# ELK - ElasticSearch

# Run
    cd elk-elasticsearch
	docker-compose up -d

# Connect
	curl http://localhost:9200

# Health Checks
	curl -X POST http://localhost:9200/todolist/_doc -H 'Content-Type: application/json' -d '{
      "title": "Test ELK Integration2",
      "description": "Fully working example2",
      "isCompleted": false,
      "createdAt": "2025-05-09T11:00:00Z"
    }'

    curl http://localhost:9200   => 
# ELK - ElasticSearch

# Run
    cd elk-elasticsearch
	docker-compose up -d

# Connect (local vs remote)
	curl http://localhost:9200
    curl http://todolist.ermalaliraj.com:9200

# Health Checks
    -- 1. ELASTICSEARCH - send log
	curl -X POST http://todolist.ermalaliraj.com:9200/todolist/_doc -H 'Content-Type: application/json' -d '{
      "title": "Test ELK Integration2",
      "description": "Fully working example2",
      "isCompleted": false,
      "createdAt": "2025-05-09T11:00:00Z"
    }'

    -- 2. ELASTICSEARCH - check json config
    curl http://todolist.ermalaliraj.com:9200/
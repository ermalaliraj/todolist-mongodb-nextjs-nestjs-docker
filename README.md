# todolist-mongodb-nextjs-nestjs-docker

Build a simple To-Do List application with full CRUD operations (Create, Read, Update, Delete).

# Requirements
- Log all key task events (creation, update, deletion, retrieval) in structured JSON format.
- Ship logs to the ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging.
- Configure a basic Kibana dashboard to visualize and analyze log events.

# Tech Stack
- Backend:
    - Mandatory: NestJS, MongoDB,
    - Nice to Have: RabbitMQ, Redis, Apollo GraphQL
- Frontend: React or Next.js
- DevOps: Docker, Kubernetes, Helm, ELK Stack

# Running the application
- All services must be containerized using Docker.
- Use Docker Compose to manage and run the full stack locally.
- Use Kubernetes for deployment in a cluster environment.
- Manage Kubernetes deployments using Helm charts.

# Documentation
- Build a UML diagram to represent the architecture of the application.
- Build REST calls using Postman
- Explain the Dockerization strategy. Detail the reasoning based on factors such as consistency, portability, and dependency management.

### Deadline
The test task is expected to take a minimum of 8 hours to complete.


### Links
  http://todolist.ermalaliraj.com
  http://todolist-api.ermalaliraj.com
  http://todolist.ermalaliraj.com:9200/
  http://todolist.ermalaliraj.com:5601
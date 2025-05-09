The test task is expected to take a minimum of 8 hours to complete.
What to Build?
You’ll create a simple to-do list application with CRUD operations using NestJS, containerize the necessary services with Docker, and integrate logging using the ELK Stack (Elasticsearch, Logstash, Kibana). The app should log key events (e.g., when tasks are created, updated, deleted, or retrieved), and you’ll set up a basic Kibana dashboard to visualize those logs.
Tech Requirements
Backend: Build the app using NestJS with MongoDB.
Logging: Implement JSON logging for CRUD operations (e.g., log when tasks are created, updated, deleted, or retrieved).
Docker: Use Docker to containerize the necessary services for the application and manage them with Docker Compose. In your README, explain why you chose to Dockerize each service, detailing your reasoning based on factors like consistency, portability, or dependency management.
ELK Stack:
Configure the app to output logs to a file or stdout in JSON format.
Set up Logstash (or Filebeat) to collect and forward these logs to Elasticsearch.
Create a basic Kibana dashboard to visualize the logs (e.g., show the number of CRUD operations over time or highlight error logs).
Submission
Deploy the app locally using Docker Compose.
Share your public GitHub repository containing all the code.
Include a README with:
Clear instructions to build and run the app.
Explanation of why you chose to Dockerize each service.
Steps to access the Kibana dashboard.
Screenshots or a brief description of your Kibana dashboard showing the visualized logs.
Compensation for the Test Task
You’ll be compensated for the full hours worked on this task, with compensation reflected in your first pay period.
Looking forward to seeing what you build! Our expectation is for you to finish it within one week from today.
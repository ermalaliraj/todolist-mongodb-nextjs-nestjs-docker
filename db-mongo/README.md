# Database Mongodb

# Run
	docker-compose up -d
    docker-compose up -d --build

# Connect to MongoDB
    -- local 
	mongo -u todolist -p todolist --authenticationDatabase admin --host localhost --port 27017
    -- remote
    mongosh -u todolist -p todolist --authenticationDatabase admin --host mongo.ermalaliraj.com --port 27017

# Health Checks
	use todolist
	db.getUsers()
	db.getCollectionNames()
	db.todos.insertOne({title: "Set up NestJS project", description: "Initialize project structure and install required modules", isCompleted: false, dueDate: new Date("2025-05-15T23:59:00Z"), createdAt: new Date(), updatedAt: new Date()})
	db.todos.find().pretty()

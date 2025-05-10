### Jenkins Configuration  (all the same)
    Discard old builds
        Strategy: Log Rotation
            Max # of builds to keep: 3
    
    Source Code Management
        Git
            Repository URL: git@github.com:ermalaliraj/todolist-mongodb-nextjs-nestjs-docker.git
            Credentials: jenkins
        Branches to build: */main
    
    Poll SCM
        Schedule: * * * * *

### Execute shell
    sh db-mongo/jenkins-deploy.sh
    sh elk-elasticsearch/jenkins-deploy.sh
    sh elk-kibana/jenkins-deploy.sh
    sh frontend/jenkins-deploy.sh
    sh backend/jenkins-deploy.sh
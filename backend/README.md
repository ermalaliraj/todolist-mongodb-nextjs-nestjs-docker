# todolist backend

# Docker Run
    docker-compose up -d --build

# Docker Health Checks
    curl http://localhost:5041
    curl todolist-api.ermalaliraj.com
	
# Integration with elastic search 
    https://www.npmjs.com/package/@elastic/elasticsearch    
    npm i @elastic/elasticsearch

    https://www.elastic.co/docs/reference/elasticsearch/clients/javascript/connecting#client-usage

    const { Client } = require('@elastic/elasticsearch')
    const client = new Client({
        node: 'https://localhost:9200',
        tls: {
            rejectUnauthorized: false
        }
    })
    
# integration with winston
    https://www.npmjs.com/package/winston-elasticsearch

    const winston = require('winston');
    const { ElasticsearchTransport } = require('winston-elasticsearch');

    const esTransportOpts = {
    level: 'info'
    };
    const esTransport = new ElasticsearchTransport(esTransportOpts);
    const logger = winston.createLogger({
    transports: [
        esTransport
    ]
    });

# secure integration
    https://www.elastic.co/docs/reference/elasticsearch/clients/javascript/getting-started#_creating_an_index


import * as winston from 'winston'
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { Client } from '@elastic/elasticsearch';

const elasticSearchClient = new Client({
  node: 'http://todolist.ermalaliraj.com:9200',
  tls: {
    rejectUnauthorized: false
  }
});

const elasticSearchConf = {
  level: 'silly',
  client: elasticSearchClient as any,
  index: 'app-todolist', 
  bufferLimit: 100,
  flushInterval: 2000,
  // transformer: (logData: any) => {
  //   console.log('Log sent to ELK:', logData);
  //   return logData;
  // }
};
const elasticSearchTransport = new ElasticsearchTransport(elasticSearchConf);

const consoleConfig = {
  winston: {
    console: {
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      handleExceptions: true,
      level: 'debug',
    },
  },
}

const logger = winston.createLogger({
    format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),         
    winston.format.json()              
  ),
  transports: [
    new winston.transports.Console(consoleConfig.winston.console),
    elasticSearchTransport
  ],
})

export default logger;
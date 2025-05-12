import { Client } from '@elastic/elasticsearch';

// const elasticsearchServer = process.env.ELASTICSEARCH_SERVER;
const elasticsearchServer = "http://todolist.ermalaliraj.com:9200"
console.log('elasticsearchServer:', elasticsearchServer);

const esClient = new Client({
  node: elasticsearchServer,
  tls: {
    rejectUnauthorized: false,
  },
});

esClient
  .ping()
  .then(() => console.log('Elasticsearch client is connected'))
  .catch((err) =>
    console.error('Elasticsearch client connection failed:', err),
  );

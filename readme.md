## Activate 
## gcloud auth activate-service-account --key-file=[PATH]
ex:
static-172-17-172-174:node_nlp gabrielc$ gcloud auth activate-service-account --key-file=credentials.json
Activated service account credentials for: [gabriel@naturallanguage-203510.iam.gserviceaccount.com]


### Connection String to MongoDb Atlas
mongodb://gabikiwi:<PASSWORD>@cluster0-shard-00-00-ozmxi.mongodb.net:27017,cluster0-shard-00-01-ozmxi.mongodb.net:27017,cluster0-shard-00-02-ozmxi.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true

###
Promise.all([promise1, promise2])

### MockUp call
curl https://jsonplaceholder.typicode.com/posts/1

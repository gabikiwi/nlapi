const getFilesFromBucket = function getFilesFromBucket(res, pBucketName) {

    // Imports the Google Cloud client library
    const Storage = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const bucketName = 'Name of a bucket, e.g. my-bucket';

    // Lists files in the bucket
    storage
        .bucket(pBucketName)
        .getFiles()
        .then(results => {
            const files = results[0];

            console.log('Files:');
            files.forEach(file => {
                console.log(file.name);
            });

            var filesName = []
            for(var i =0;i<files.length; i++ ){
                filesName.push(files[i].name)
            }

            var filesNameFilter = files.filter(function(file){
                return file.name === 'panama_papers.edges.csv';
            })

            var filesNameMap = files.map((file) => file.name);
            
            return res.status(201).json({
                message: `Acesta e raspunsul la requestul POST pentru fisierele aflate in ${pBucketName}`,
                files: filesNameMap
            });




        })
        .catch(err => {
            console.error('ERROR:', err);
        });

}

module.exports = getFilesFromBucket;
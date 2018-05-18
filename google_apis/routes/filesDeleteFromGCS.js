const deleteFileFromGCS = function deleteFileFromGCS(pFilename){

// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

const config  =   require('../../config');
const CLOUD_BUCKET = config.get('CLOUD_BUCKET')


// Creates a client
const storage = new Storage();
const bucket = storage.bucket(CLOUD_BUCKET);

console.log(bucket.name);
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Name of a bucket, e.g. my-bucket';
//const filename = '1526541002742bbccccaandroid_text.5_en.txt';

// Deletes the file from the bucket
storage
  .bucket(bucket.name)
  .file(pFilename)
  .delete()
  .then(() => {
    console.log(`gs://${bucket.name}/${filename} deleted.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

} 

module.exports = deleteFileFromGCS;
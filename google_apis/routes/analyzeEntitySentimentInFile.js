const analyzeEntitySentimentInFile = function analyzeEntitySentimentInFile(bucketName, fileName) {
    // [START language_entity_sentiment_file]
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Creates a client
    const client = new language.LanguageServiceClient();
  
    /**
     * TODO(developer): Uncomment the following lines to run this code
     */
    // const bucketName = 'Your bucket name, e.g. my-bucket';
    // const fileName = 'Your file name, e.g. my-file.txt';
  
    // Prepares a document, representing a text file in Cloud Storage
    const document = {
      gcsContentUri: `gs://${bucketName}/${fileName}`,
      type: 'PLAIN_TEXT',
    };
  
    // Detects sentiment of entities in the document
    client
      .analyzeEntitySentiment({document: document})
      .then(results => {
        const entities = results[0].entities;
  
        console.log(`Entities and sentiments:`);
        entities.forEach(entity => {
          console.log(`  Name: ${entity.name}`);
          console.log(`  Type: ${entity.type}`);
          console.log(`  Score: ${entity.sentiment.score}`);
          console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END language_entity_sentiment_file]
  }

  
function analyzeEntitiesInFile(bucketName, fileName) {
    // [START language_entities_file]
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
  
    // Detects entities in the document
    client
      .analyzeEntities({document: document})
      .then(results => {
        const entities = results[0].entities;
  
        console.log('Entities:');
        entities.forEach(entity => {
          console.log(entity.name);
          console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
          if (entity.metadata && entity.metadata.wikipedia_url) {
            console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
          }
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END language_entities_file]
  }
  
const analyzeEntitiesFile = function analyzeEntitiesInFile(res, fileName) {
  // [START language_entities_file]
  // Imports the Google Cloud client library
  'use strict';

  const Storage = require('@google-cloud/storage');
  const language = require('@google-cloud/language');

  const config = require('../../config');
  const CLOUD_BUCKET = config.get('CLOUD_BUCKET')
  const storage = Storage({
    projectId: config.get('GCLOUD_PROJECT')
  });
  const bucket = storage.bucket(CLOUD_BUCKET);
  const bucketName = bucket.name;

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
    .analyzeEntities({
      document: document
    })
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


      var EntitiesNameMap = entities.map((entity) => entity.name);
      var EntitiesSalienceMap = entities.map((entity) => entity.salience);
      var EntitiesTypeMap = entities.map((entity) => entity.type);
      var EntitiesWikiMap = entities.map((entity) => entity.metadata.wikipedia_url);


      let ResponseCustom = [];

      for (var i = 0; i < EntitiesNameMap.length; i++) {

        var obj = {
          'name': EntitiesNameMap[i],
          'salience': EntitiesSalienceMap[i],
          'type': EntitiesTypeMap[i],
          'Wiki': EntitiesWikiMap[i]
        }
        ResponseCustom.push(obj);
      }
      return res.status(201).json({
        message: 'Acesta e raspunsul la requestul POST de la Google pentru Entities in a file in GCS',
        input: document.content,
        entities: ResponseCustom

      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_entities_file]
}

module.exports = analyzeEntitiesFile;
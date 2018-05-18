const analyzeSentimentFile = function analyzeSentimentInFile(res, fileName) {

  'use strict';

  const Storage = require('@google-cloud/storage');

  const config = require('../../config');
  const CLOUD_BUCKET = config.get('CLOUD_BUCKET')
  const storage = Storage({
    projectId: config.get('GCLOUD_PROJECT')
  });
  const bucket = storage.bucket(CLOUD_BUCKET);
  const bucketName = bucket.name;


  // [START language_sentiment_file]
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

  // Detects the sentiment of the document
  client
    .analyzeSentiment({
      document: document
    })
    .then(results => {
      const sentiment = results[0].documentSentiment;
      console.log(`Document sentiment:`);
      console.log(`Score: ${sentiment.score}`);
      console.log(`Magnitude: ${sentiment.magnitude}`);

      const sentences = results[0].sentences;
      sentences.forEach(sentence => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`Score: ${sentence.sentiment.score}`);
        console.log(`Magnitude: ${sentence.sentiment.magnitude}`);
      });


      var SentencesTextContentMap = sentences.map((sentence) => sentence.text.content);
      var SentencesSentimentScoreMap = sentences.map((sentence) => sentence.sentiment.score);
      var SentencesSentimentMagnitudeMap = sentences.map((sentence) => sentence.sentiment.magnitude);
    


      let ResponseCustom = [];

      for (var i = 0; i < SentencesTextContentMap.length; i++) {

        var obj = {
          'sentence.text.content': SentencesTextContentMap[i],
          'sentence.sentiment.score': SentencesSentimentScoreMap[i],
          'sentence.sentiment.magnitude': SentencesSentimentMagnitudeMap[i]
        }
        ResponseCustom.push(obj);
      }
      return res.status(201).json({
        message: 'Acesta e raspunsul la requestul POST de la Google pentru Sentiment in a file in GCS',
        'Score Total Document': sentiment.score,
        'Magnitude Total document': sentiment.magnitude,
        'Rezultate partiale':ResponseCustom
      });

      /*return res.status(201).json({
        message: 'Acesta e raspunsul la requestul POST pentru Analiza Sentiment venit de la Google NL API',
        InputText: document.content,
        "Sentiment Score": sentiment.score,
        "Sentiment Magnitude": sentiment.magnitude,
        everything: results[0].documentSentiment
      });*/


    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_sentiment_file]
}

module.exports = analyzeSentimentFile;
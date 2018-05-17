const analyzeSentimentInFile = function analyzeSentimentInFile(bucketName, fileName) {
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
      .analyzeSentiment({document: document})
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
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END language_sentiment_file]
  }

  module.exports=analyzeSentimentInFile;
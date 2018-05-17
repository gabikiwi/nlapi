const analyzeSyntaxInFile = function analyzeSyntaxInFile(bucketName, fileName) {
    // [START language_syntax_file]
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
  
    // Detects syntax in the document
    client
      .analyzeSyntax({document: document})
      .then(results => {
        const syntax = results[0];
  
        console.log('Parts of speech:');
        syntax.tokens.forEach(part => {
          console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
          console.log(`Morphology:`, part.partOfSpeech);
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END language_syntax_file]
  }
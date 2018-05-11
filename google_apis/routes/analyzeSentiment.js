const analyzeSentiment = function analyzeSentimentOfText(res, text) {
    // [START language_sentiment_string]
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Creates a client
    const client = new language.LanguageServiceClient();

    /**
     * TODO(developer): Uncomment the following line to run this code.
     */
    // const text = 'Your text to analyze, e.g. Hello, world!';

    // Prepares a document, representing the provided text
    const document = {
        content: text,
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

            return  res.status(201).json({
                message: 'Acesta e raspunsul la requestul POST pentru Analiza Sentiment venit de la Google NL API',
                InputText: document.content,
                "Sentiment Score":sentiment.score,
                "Sentiment Magnitude":sentiment.magnitude,
                everything: results[0].documentSentiment
            });
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    // [END language_sentiment_string]
}

module.exports=analyzeSentiment;
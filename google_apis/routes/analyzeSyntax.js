const analyzeSyntax = function analyzeSyntaxOfText(res, text) {
    // [START language_syntax_string]
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

    // Detects syntax in the document
    client
        .analyzeSyntax({
            document: document
        })
        .then(results => {
            const syntax = results[0];

           

            console.log('Tokens:');
            syntax.tokens.forEach(part => {
                console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
                console.log(`Morphology:`, part.partOfSpeech);

                const tag = part.partOfSpeech.tag;

              /*  return res.status(201).json({
                    message: 'Acesta e raspunsul la requestul POST venit de la Google pentru Analiza de Syntaxa',
                    input: document.content,
                    partSpeechTag:part.partOfSpeech.tag,
                    partTextContent: part.text.content,
                    "Morphology": part.partOfSpeech
                });*/

            });

             // Gabriel
             return res.status(201).json({
                message: 'Acesta e raspunsul la requestul POST pentru Analiza Syntax venit de la Google NL API',
                InputText: document.content,
                everything: results[0]
            })
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    // [END language_syntax_string]
   /* return res.status(201).json({
        message: 'Acesta e raspunsul la requestul POST venit de la Google pentru Analiza de Syntaxa',
        input: document.content
    })*/
}

module.exports = analyzeSyntax;
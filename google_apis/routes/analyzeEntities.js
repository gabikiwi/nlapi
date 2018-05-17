const analyzeEntities = function analyzeEntitiesOfText(res, text) {
    // [START language_entities_string]
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
                    /* return res.status(201).json({
                         message: 'Acesta e raspunsul la requestul POST pentru Analiza Entitati venit de la Google NL API',
                         InputText: document.content,
                         "Entity name": entity.name,
                         "Entity Type": entity.type,
                         "Entity Salience": entity.salience,
                         "Entity - Wikipedia URL:": entity.metadata.wikipedia_url,
                         everthing: entities 
                     });*/
                }

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
                    message: 'Acesta e raspunsul la requestul POST de la Google pentru Entities',
                    input: document.content,
                    entities: ResponseCustom

                });


            });


        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    // [END language_entities_string]
}


module.exports = analyzeEntities;
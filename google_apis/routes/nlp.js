const express = require('express');
const language = require('@google-cloud/language');
// 
const router = express.Router();

// Business Logic
const test  =   require('./test');
const analyzeSentiment  =   require('./analyzeSentiment');
const analyzeEntities   =   require('./analyzeEntities');
const analyzeSyntax     =   require('./analyzeSyntax');

router.get('/nlp', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /nlp'
    });
});


router.post('/nlp/analyzeSentiment', (req, res, next) => {
    
    // create a POST request 
    const nlpPOSTReq = {
        text: req.body.paramText
    }

    analyzeSentiment(res,nlpPOSTReq.text);

});

router.post('/nlp/analyzeEntities', (req, res, next) => {
    
    // create a POST request 
    const nlpPOSTReq = {
        text: req.body.paramText
    }

    analyzeEntities(res,nlpPOSTReq.text);

});

router.post('/nlp/analyzeSyntax', (req, res, next) => {
    
    // create a POST request 
    const nlpPOSTReq = {
        text: req.body.paramText
    }

    analyzeSyntax(res,nlpPOSTReq.text);

});






router.get('/nlp/:nlpId', (req, res, next) => {
    const id = req.params.nlpId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/nlp/:nlpId', (req, res, next) => {
    const id = req.params.nlpId;
    res.status(200).json({
        message: 'Updated message catched!',
        id: id
    });
});

router.delete('/nlp/:nlpId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted nlpId!'
    });
});

module.exports = router;
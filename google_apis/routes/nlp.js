const express = require('express');
const language = require('@google-cloud/language');
// 
const router = express.Router();

// Business Logic
const test  =   require('./test');
const analyzeSentiment = require('./analyzeSentiment');
const analyzeEntities = require('./analyzeEntities');
const analyzeSyntax = require('./analyzeSyntax');


//Handling file upload with multer
//const multer = require('multer');
const Multer = require('multer');
const filesToGCS = require('./filesToGCS');

// 1. The simplest way to upload a file
// Const upload = multer({dest:'uploads/'});

// 2. a more complicated way
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024, 
    filename: function(req,file, cb){
        cb(null, new Date().toISOString() + "_" + file.originalname);
    }
});
//const upload = multer ({storage:storage});

/* const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
  });*/

// Storage
const getFilesFromBucket = require('./getFilesFromBucket');


router.get('/nlp', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /nlp'
    });
});

router.post('/nlp/file-upload', multer.single('fileUpload'), filesToGCS.sendUploadToGCS, (req, res, next) => {
    const data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
    response.send(data);
  })


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

    analyzeEntities(res, nlpPOSTReq.text);

});

router.post('/nlp/analyzeEntitiesInFile', (req, res, next) => {

    // this is an object which multer give us
    console.log(req.file);
    // create a POST request 
    const nlpPOSTReq = {
        text: req.body.paramText
    }

    analyzeEntities(res,nlpPOSTReq.text);


});



router.post('/nlp/getFilesFromBucket', (req, res, next) => {

    // create a POST request 
    const nlpPOSTgetFilesFromBucketReq = {
        bucketName: req.body.bucketName
    }
    //console.log(req.body.projectID);
    console.log(req.body.bucketName);
    getFilesFromBucket(res, nlpPOSTgetFilesFromBucketReq.bucketName);

});



router.post('/nlp/analyzeSyntax', (req, res, next) => {
    
    // create a POST request 
    const nlpPOSTReq = {
        text: req.body.paramText
    }

    analyzeSyntax(res,nlpPOSTReq.text);

});

router.post('/nlp/classifyTextInFile', (req, res, next) => {
    
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
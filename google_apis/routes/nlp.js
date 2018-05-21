const express = require('express');
const language = require('@google-cloud/language');
// 
const router = express.Router();

// Business Logic
const test = require('./test');

const analyzeSentiment = require('./analyzeSentiment');
const analyzeSentimentFile = require('./analyzeSentimentInFile');

const analyzeEntities = require('./analyzeEntities');
const analyzeEntitiesFile = require('./analyzeEntitiesInFile');

const analyzeSyntax = require('./analyzeSyntax');



// Storage
const filesToGCS = require('./filesUploadToGCS');
const filesDeleteFromGCS = require('./filesDeleteFromGCS');
const getFilesFromBucket = require('./filesListFromBucket');


//Handling file upload with multer
//const multer = require('multer');
const Multer = require('multer');

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
    res
    .send(data)
    .status(201).json({
        message: `File ${file.originalname} uploaded to Google Cloud!`,
    });

  })


router.post('/nlp/analyzeSentiment', (req, res, next) => {
    
    // create a POST request 
    const nlpPOSTReq = {
        text: req.body.paramText
    }

    analyzeSentiment(res,nlpPOSTReq.text);

});

router.post('/nlp/analyzeSentimentInFile', (req, res, next) => {
    
  
    console.log(req.body.fileName);
    // create a POST request 
    const nlpPOSTReq = {
        file_name: req.body.fileName
    }

    analyzeSentimentFile(res,nlpPOSTReq.file_name);

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
    console.log(req.body.fileName);
    // create a POST request 
    const nlpPOSTReq = {
        file_name: req.body.fileName
    }

    analyzeEntitiesFile(res,nlpPOSTReq.file_name);


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

router.delete('/nlp/files/:fileName', (req, res, next) => {

    const file_name = req.params.fileName;
    console.log(file_name);
    filesDeleteFromGCS(file_name);

    res.status(200).json({
        message: `Deleted ${file_name} from Google Cloud`
    });

});


router.patch('/nlp/:nlpId', (req, res, next) => {
    const id = req.params.nlpId;
    res.status(200).json({
        message: 'Updated message catched!',
        id: id
    });
});



module.exports = router;
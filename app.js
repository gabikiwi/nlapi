const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require ('body-parser');

// NLP processing
const nlpRoutes = require('./google_apis/routes/nlp');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());


// Handling and prevent CORS problems
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'PUT', 'POST', 'PATCH', 'DELETE');
        return res.status(200).json({

        });
    }
    next();
})


// sending requests to the routes
app.use('/', nlpRoutes);

//handling custom errors 
app.use((req, res, next) => {
    const error = new Error ('not found');
    error.status = 404;
    next(error);

})

//handling generic errors 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });

})

/**
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works again!'
    });
});
 */


module.exports = app;


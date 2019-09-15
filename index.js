const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Kraken = require('kraken');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const kraken = new Kraken({
    "api_key":"6ad9a171d34ab8dc500bef1e996146c1",
    "api_secret":"67028700075a70b087ba19dd8c39373b7b03faa2"
});

app.get('/',(req,res)=>{
    res.json({"he":"dd"}); //<-- GET works fine on both Postman and the webapp
});

app.post('/upload',(req,res)=>{
    opts={
        url:req.body.link, //<-- req.boy is empty when endpoint is called from a webapp with JQuery but is popolated when called on Postman
        wait:true,
        lossy:true,
        quality:60
    };

    //res.json(opts);

    kraken.url(opts,(err,data)=>{

        if(err){
            res.json([{"Status":"Failed"},{"Message":"Forbidden file format"}]);
        }else{
            res.json(data);
        }

    });

});

app.post('/image',(req,res)=>{
    opts={
        file:req.body.Image, //<-- req.boy is empty when endpoint is called from a webapp with JQuery but is popolated when called on Postman
        wait:true,
        lossy:true,
        quality:60
    };

    //res.json(opts);

    kraken.upload(opts,(err,data)=>{

        if(err){
            res.json([{"Status":"Failed"},{"Message":"Forbidden file format"}]);
        }else{
            res.json(data);
        }

    });

});

app.listen(port,()=>{
    console.log('server running on port',port);
});
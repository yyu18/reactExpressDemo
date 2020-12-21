require('dotenv').config()
const express = require('express');
const allowCrossDomain = require('./utils/allowCrossDomain');

const app = express();
const { errorHandler } = require('./utils/error');

const { getResume, createResume } = require('./mongoHandler/dbConnect');

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

app.use(express.json());
app.use(allowCrossDomain);

app.listen(4003,'0.0.0.0',function() { console.log('Example app listening on port 4003!');});

app.get('/resume',async(req,res) => {
try{
  let resume =  await getResume({})
  res.sendStatus(200,'application/json',{
    status:true,
    results:resume
  })
  console.log(resume)

} catch(err) {
  return next(err)
}
})

app.post('/resume',function(req,res,next){
  createResume(req.body,(err,resume)=>{
    if(err) return next(err)
    console.log(resume)
  })


  res.sendStatus(200,'application/json',{status:true})
}) 

app.use(errorHandler);
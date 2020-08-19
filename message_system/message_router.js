const express = require('express')
const graphql = require('express-graphql');
const {GraphQLSchema} = require('graphql');
const {queryType} = require('./query.js');
const router = express.Router()

const schema = new GraphQLSchema({ query: queryType });

router.use('/test',graphql({
    schema:schema,
    graphiql:true
}))
module.exports = router;




function test  (req,res,next) {
    res.send('test')
}


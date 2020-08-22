require('dotenv').config()
var express = require('express');
var app = express();
//var https = require("https");
const allowCrossDomain = require('./utils/allowCrossDomain');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { queryType } = require('./graphQL_api/query.js');

const { errorHandler } = require('./utils/error');

app.use(express.json())
app.use(allowCrossDomain)
app.listen(6666,'0.0.0.0',function() { console.log('Example app listening on port 6000!');});

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

const schema = new GraphQLSchema({ query: queryType });
app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.use(errorHandler);
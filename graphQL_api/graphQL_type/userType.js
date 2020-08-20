const { GraphQLObjectType,GraphQLID, GraphQLString, GraphQLList,GraphQLNonNull,GraphQLInt, } = require('graphql');
const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        userId : { type: GraphQLString },
        username :{ type: GraphQLString },
        email : { type: GraphQLString },
    }
})    

module.exports = {userType}
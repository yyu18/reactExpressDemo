const { GraphQLObjectType,GraphQLID, GraphQLString, GraphQLList,GraphQLNonNull,GraphQLInt, } = require('graphql');
const {userType} = require('./userType');
const { Users } = require('../../mongoHandler/dbConnect');

const profileSection = new GraphQLObjectType({
    name:'Section',
    fields:{
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        type:{ type:GraphQLString },
        content:{ type:GraphQLList(GraphQLString) }
    }
})

const profileType = new GraphQLObjectType({
    name:'Profile',
    fields: {
        myProfile : { 
            type : GraphQLList(profileSection),
            resolve:(source)=>{
                return source.myProfile
            }
         },
        userId : { 
            type : userType,
            resolve:async (source)=>{
                try{
                    return await Users.findOne({userId:source.userId})
                } catch (err) {
                    throw new Error(err.message)
                }
            } 
        }
    }
})

const paginationType = new GraphQLObjectType({
    name:'NextPrevious',
    fields:{
        page:{type:GraphQLInt},
        limit:{type:GraphQLInt}
    }
})

const profilePagination = new GraphQLObjectType({
    name:'Pagination',
    fields:{
        previous:{ 
            type:paginationType,
            resolve:(source)=>{
                return source.previous
            }
         },
        results:{
            type:GraphQLList(profileType),
            resolve:(source)=>{
                return source.results
            }
        },
        next:{ 
            type:paginationType,
            resolve:(source)=>{
                return source.next
            }
         }
    }

})

module.exports={ profilePagination }
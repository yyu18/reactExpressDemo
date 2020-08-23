const { GraphQLObjectType,GraphQLID, GraphQLString, GraphQLList,GraphQLNonNull,GraphQLInt, } = require('graphql');
const { retrieveProfile, Profiles,Users } = require('../mongoHandler/dbConnect');
const { profilePagination } = require('./graphQL_type/profileType')
const { userType } = require('./graphQL_type/userType')

//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: ()=>(
        {
            profile:{
                type:profilePagination,
                args:{
                    userId:{ type : GraphQLString },
                    page:{ type : GraphQLInt },
                    limit:{ type : GraphQLInt}
                },
                resolve:async (source,args)=>{
                    try{
                        if(args.userId) return { previous:null, results:[await retrieveProfile({userId:args.userId})], next:null }
                        
                        if(!(args.page&&args.limit)) throw new Error('page and limit not define')

                        const page = parseInt(args.page)
                        const limit = parseInt(args.limit)

                        const startIndex = (page - 1) * limit
                        const endIndex = page * limit

                        const results = {}
                        if (endIndex < await Profiles.countDocuments().exec()) {
                            results.next = {
                            page: page + 1,
                            limit: limit
                            }
                        }
                            
                        if (startIndex > 0) {
                            results.previous = {
                            page: page - 1,
                            limit: limit
                            }
                        }

                        results.results = await Profiles.find().limit(limit).skip(startIndex).exec()
                        return results

                    } catch(err) {throw new Error(err.message)}
                }
            },
            user:{
                type:userType,
                args:{
                    userId:{ type:GraphQLString }
                },
                resolve: async(source,args)=>{
                    try{
                        return await Users.findOne({userId:args.userId})
                    } catch (err) {
                        throw new Error(err.message)
                    }
                }
            },
        }
    )  
});

module.exports = { queryType }
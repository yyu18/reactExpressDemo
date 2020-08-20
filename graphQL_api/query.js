const { GraphQLObjectType,GraphQLID, GraphQLString, GraphQLList,GraphQLNonNull,GraphQLInt, } = require('graphql');
const { retrieveProfile, Profiles,Users } = require('../mongoHandler/dbConnect');
const { profilePagination } = require('./graphQL_type/profileType')
const { userType } = require('./graphQL_type/userType')
const users=[
    {
        "token" : "0",
        "resetPasswordToken" : "",
        "resetPasswordExpire" : 0,
        "userId" : "cheryli-K5I4LCWatgjqoeLI6WxQ",
        "username" : "chery li",
        "email" : "cheryla@hotmail.com",
        "password" : "sha1$82fb1a5c$1$de64d0ed0ab1ee22fa9c100ddd7f270ed22a18e4",
    },
    {
        "token" : "0",
        "resetPasswordToken" : "",
        "resetPasswordExpire" : 0,
        "userId" : "hubertyu-3LQj7dPm1wwSiFXok55r",
        "username" : "hubert yu",
        "email" : "hunt.yuyh@gmail.com",
        "password" : "sha1$96f68b3a$1$cfa4f9de4335cda0e089e723929624aad72ec3be",
    },
    {
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpbm8gcWkiLCJlbWFpbCI6ImZpbm8ucWlAZ21haWwuY29tIiwidXNlcklkIjoiZmlub3FpLUZFaUpWZkJYTk85ODZmZ0ZPUHROIiwiaWF0IjoxNTk3ODY0MDA2fQ.DsE0IDpsdMpE-a8I3S40hHGSjhIv5UAZ6Ihi5LWBsDQ",
        "resetPasswordToken" : "",
        "resetPasswordExpire" : 0,
        "userId" : "finoqi-FEiJVfBXNO986fgFOPtN",
        "username" : "fino qi",
        "email" : "fino.qi@gmail.com",
        "password" : "sha1$4888998f$1$edc8c2f740135b9eca5e33b2b86c56323cec2fc9",
    },
    {
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlpaHUgeXUiLCJlbWFpbCI6Inl5dTE4QGxha2VoZWFkdS5jYSIsInVzZXJJZCI6InlpaHV5dS1wRGRnWklrRzhBM2c0ZFhlbXh5eSIsImlhdCI6MTU5Nzg2MzkxMH0.n1aIhI5xLl06GIxXRy89GPqOud7v3za-Zfydtq4TjfQ",
        "resetPasswordToken" : "",
        "resetPasswordExpire" : 0,
        "userId" : "yihuyu-pDdgZIkG8A3g4dXemxyy",
        "username" : "yihu yu",
        "email" : "yyu18@lakeheadu.ca",
        "password" : "sha1$3a96182a$1$6fd72a9945cff2df37b9da08fbbb66642640938b",
    }
]

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
                        if(args.userId) {
                            return {
                                previous:null,
                                results:[await retrieveProfile({userId:args.userId})],
                                next:null
                            }
                        }
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
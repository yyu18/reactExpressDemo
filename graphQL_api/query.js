const { GraphQLObjectType,GraphQLID, GraphQLString, GraphQLList,GraphQLNonNull,GraphQLInt, } = require('graphql');
let movies = [{
    id: 1,
    name: "Movie 1",
    year: 2018,
    directorId: 1
},
{
    id: 2,
    name: "Movie 2",
    year: 2017,
    directorId: 1
},
{
    id: 3,
    name: "Movie 3",
    year: 2016,
    directorId: 3
}
];

let directors = [{
    id: 1,
    name: "Director 1",
    age: 20
},
{
    id: 2,
    name: "Director 2",
    age: 30
},
{
    id: 3,
    name: "Director 3",
    age: 40
}
];

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

const profiles = [
    {
        "myProfile" : [
            {
                "id" : "8aAIQJxvdNe",
                "name" : "profile1",
                "content" : [
                    "aawd",
                    "qwdsad",
                    "sadfewfew",
                    "wefsdf"
                ],
                "type" : "inputList"
            }
        ],
        "userId" : "yihuyu-pDdgZIkG8A3g4dXemxyy",
    },
    {
        "myProfile" : [
            {
                "id" : "8aAIQJxvdNe",
                "name" : "profile1",
                "content" : [
                    "aawd",
                    "qwdsad",
                    "sadfewfew",
                    "wefsdf"
                ],
                "type" : "inputList"
            }
        ],
        "userId" : "finoqi-FEiJVfBXNO986fgFOPtN",
    }
]
userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        token : { type: GraphQLString },
        resetPasswordToken : { type: GraphQLString },
        resetPasswordExpire : { type: GraphQLInt },
        userId : { type: GraphQLString },
        username :{ type: GraphQLString },
        email : { type: GraphQLString },
        password : { type: GraphQLString }
    }
})     

movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        year: { type: GraphQLInt },
        directorId: { type: GraphQLID }
    }
});
//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: ()=>(
        {
            hello:{
                type:GraphQLString,
                resolve:()=>{
                    return 'hello'
                }
            },
            user:{
                type:userType,
                args:{
                    userId:{ type:GraphQLString }
                },
                resolve: (source,args)=>{
                    return users.find(e=>{
                        if(e.userId===args.userId) return e
                    })
                }
            },
            movie: {
                type: movieType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: function (source, args) {
                    return movies.find(e=>{
                        if(e.id===args.id)  return e   
                    })
                }
            },
            director: {
                type: directorType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: function (source, args) {
                    return directors.find(e=>{
                        if(e.id===args.id) return e
                    })
                }
            }
        }
    )
   
});

directorType = new GraphQLObjectType({
    name: 'Director',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(movieType),
            resolve:(source, args)=> {
                return  movies.filter(e=>{
                    return e.directorId===source.id 
                })  
            }

        }

    }
});



module.exports = { queryType }
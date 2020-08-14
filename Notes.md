# How to name URI
## URI use noun, hierarchy relations
e.g.
/messages    first level collections URI

/messages/1  second level resources URI

/messages/1/comments/3   third level resources URI

/messages/1/likes/4

instance resource uri, with :id

collection resource uri, with no :id,its a collection

instance resource uri ,with :id, specific item

query param for pagination and filter

# idempotency, pure function
idempotency, run multiple times have the same results as run single time

get, put, delete(idempotency)  / post patch

pure function, no side effects, no change on params,no change to outside variable, same param return same result.

do not use too long if function, return early

# Reference VS Value

[] and {} are reference, pass the memory address reference to the declared variable

let c = [1,2] // variable c have the memory address reference e.g. 0x01

let a = c;

a.push(3)

//result : a=[1,2,3] c=[1,2,3] variable a saved the memory address reference, 

when a changed, the value on the memory address reference changed. so c also changed.



const c =1;

c=2//not work, the value change is not allow

const c = [1,2];

c.push(3) //worked, because memory address did not change, the value on the address changed, const variable do not allow the value change

# Try Catch Throw error
try{
    throw new Error('someting wrong')
} catch(err) {
    console.log(err)
}
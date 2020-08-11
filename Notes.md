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
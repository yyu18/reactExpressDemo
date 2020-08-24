
//no side effects: no change on input, and any other things outside the function
//no super long if function
//params no more than 3

//Be careful to the memory address reference, array and object value are saved on the memory address

//declare variable with reference  will save the memorry address reference to it, not value

//make sure all the function here is pure function, no side effects, same argument have same result

export const deleteContentByID = (id,array) =>{
    let newArray = []
    array.map(e=>{
        let newObject = {...e}
        return newArray.push(newObject)
    })

    if(!(newArray&&id!==undefined)) return newArray
    return newArray.filter((e)=>{
        return e.id!==id
    })
}

export const changeContentByID = (id, array, newContent) => {
    let newArray = []
    array.map(e=>{
        let newObject = {...e}
        return newArray.push(newObject)
    })

    if(!(newArray&&id!==undefined)) return newArray
    return newArray.map((e)=>{
        if(e.id!==id) return e
        e.content = newContent
        return e
    })
}

export const changeNameByID = (id, array, newName) => {
    let newArray = [];
    array.map(e=>{
        let newObject = {...e};
        return newArray.push(newObject);
        
    })
    if(!(newArray&&id!==undefined)) return newArray
    return newArray.map((e)=>{
        if(e.id!==id) return e;
        e.name = newName;
        return e
    })
}

export const deleteContentByIndex = (id,array) =>{
    let newArray = []
    array.map(e=>{
        return newArray.push(e)
    })
    if(!(newArray&&id!==undefined)) return newArray
    return newArray.filter((e,index)=>{
        return index!==id
    })
}
//no side effects: no change on input, and any other things outside the function
//no super long if function
//params no more than 3
export const deleteContentByID = (id,array) =>{
    if(!(array&&id!==undefined)) return []
    return array.filter((e)=>{
        return e.id!==id
    })
}

export const changeContentByID = (id, array, newContent) => {
    let newArray = [...array];
    if(!(newArray&&id!==undefined)) return [];
    return newArray.map((e)=>{
        if(e.id!==id) return e;
        e.content = newContent;
        return e
    })
}

export const changeNameByID = (id, array, newName) => {
    if(!(array&&id!==undefined)) return [];
    return array.map((e)=>{
        if(e.id!==id) return e;
        e.name = newName;
        return e
    })
}

export const deleteContentByIndex = (id,array) =>{
    if(!(array&&id!==undefined)) return []
    return array.filter((e,index)=>{
        return index!==id
    })
}
export const Validator = (value) =>{
    if(!value) return { error:true, info:'Content Is Empty' }

    return { error:false, info:'Content Is Good' }
}
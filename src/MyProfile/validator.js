export const Validator = (value) =>{
    if(!value) return { error:true, info:'Content Is Empty' }

    return { error:false, info:'Content Is Good' }
}

export const imageValidator = (images)=>{
    let feedback = {}

    if(images.length>2){ 
        feedback.image="maximum 2 files"
        return feedback 
    }

    if(images.length===0){
        feedback.image='no file upload'
        return feedback
    }
    const formData = new FormData()
    for(let i = 0;i<images.length;i++){
        if (images[i].type !== "image/png" && images[i].type !== "image/jpg" && images[i].type !== "image/jpeg") {
            feedback.image='image format not allowed'
            return feedback
        }
        
        if (images[i].size >1000000) {
            feedback.image = 'file too large'
            return feedback
        }
        
        formData.append('profileImage',images[i])
    }
    
    feedback.formData = formData
    return feedback
}
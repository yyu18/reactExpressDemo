export const Validate = (userInfo)=>{
    let errors = {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    if(userInfo.email.length>0){
      if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email))
      {
        errors.email = 'Email Is Invalidated';
      } 
    } else {
      errors.email = 'Email Address Is Required'
    }
    if(userInfo.password.length===0){
      errors.password = 'Password Is Required';
    } else if(userInfo.password.length<=6){
      errors.password = 'Password Length Must Be Greater Than 6';
    } 
    return errors;
  }


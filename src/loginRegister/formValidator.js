var checkEmail = 'http://192.168.2.24:4000/checkEmail';
export const Validate = async (userInfo)=>{
    let errors = {}

    if(userInfo.email.length>0){
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email))
      {
        errors.email = 'Email Is Invalidated';
      } else {
        const response =await fetch(checkEmail, {
          method: 'POST', // or 'PUT'
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:userInfo.email
          })
        })
        const data = await response.json();
        if(data.status!=='success'){
          errors.email = data.status;
        }
      }
    } else {
      errors.email = 'Email Address Is Required'
    }
    if(userInfo.password.length===0){
      errors.password = 'Password Is Required';
    } else if(userInfo.password.length<6){
      errors.password = 'Password Length Must Be Greater Than 6';
    } 

    if(userInfo.username.length === 0) {
      errors.username = "Username Is Required";
    }

    if(userInfo.confirmPassword.length===0){
      errors.confirmPassword = 'Password Is Required';
    } else {
      if(userInfo.confirmPassword!==userInfo.password) {
        errors.confirmPassword = "Password Is Not Compared";
      } 
    }
    return errors;
  }


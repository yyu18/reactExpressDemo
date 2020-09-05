var checkEmail = 'http://localhost:4000/users-account';
export const loginValidate = (value)=>{
  let keys = Object.keys(value);
  if(keys.length===0) return {};
  return keys.reduce((acc,cur)=>{
      if(!value[cur]) acc[cur] = cur+' is required';
      if(cur==='email') {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value[cur])) acc[cur] =cur+ ' is invalid'
      }
      if(cur==='password') {
        if(value[cur].length<6) acc[cur] = cur+' length must be greater than 6'
      }
        return acc
  },{})
}
export const Validate = async (userInfo)=>{
    let errors = {}
if(userInfo.email!==undefined){
  if(userInfo.email.length>0){
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email))
    {
      errors.email = 'Email Is Invalidated';
    } else {
      const response =await fetch(checkEmail+'/'+userInfo.email, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if(data.error){
        errors.email = data.info;
      }
    }
  } else {
    errors.email = 'Email Address Is Required'
  }
}
if(userInfo.password!==undefined){    
  if(userInfo.password.length===0){
  errors.password = 'Password Is Required';
} else if(userInfo.password.length<6){
  errors.password = 'Password Length Must Be Greater Than 6';
} 
}
  

if(userInfo.username!==undefined){
  if(userInfo.username.length === 0) {
    errors.username = "Username Is Required";
  }
}
   
if(userInfo.confirmPassword!==undefined){
  if(userInfo.confirmPassword.length===0){
    errors.confirmPassword = 'Password Is Required';
  } else {
    if(userInfo.confirmPassword!==userInfo.password) {
      errors.confirmPassword = "Password Is Not Compared";
    } 
  }
}
   
    return errors;
  }


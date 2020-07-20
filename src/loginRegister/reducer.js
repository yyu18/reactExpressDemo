//ar loginURL = 'http://192.168.2.24:4000/login';
//var registerURL = 'http://192.168.2.24:4000/register';
function reducer (state, action){
    switch(action.type){
        case 'changeUserInfo':
            return {
              ...state,[action.payload.name]:action.payload.value
            }
        case 'login':
            console.log(action.payload);
            return true;
        default:
            break
    }
}

export default reducer;
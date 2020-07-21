var loginURL = 'http://192.168.2.24:4000/login';
//var registerURL = 'http://192.168.2.24:4000/register';
function reducer (state, action){
    switch(action.type){
        case 'changeUserInfo':
            return {
              ...state,[action.payload.name]:action.payload.value
            }
        case 'login':
            fetch(loginURL, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            }).catch((error) => {
                console.error('Error:', error);
            });
            return state;
        default:
            throw new Error('Unknown action type:'+action.type);
    }
}

export default reducer;
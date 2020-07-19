var loginURL = 'http://192.168.2.24:4000/login';
//var registerURL = 'http://192.168.2.24:4000/register';
function reducer (state, action){
    switch(action.type){
        case 'login':
            fetch(loginURL, {
                method: 'post',
                body: {
                    username:'hubert',
                    email:'hunt.yuyh@gmail.com',
                    password:'123'
                }
              })
              .then(response => response.json())
              .then((data)=> {
                console.log('Request succeeded with JSON response', data);
              })
              .catch(function (error) {
                console.log('Request failed', error);
              });
              break;
        default:
            console.log(action.payload);
            return state;
    }
}

export default reducer;
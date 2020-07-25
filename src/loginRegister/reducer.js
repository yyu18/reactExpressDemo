function reducer (state, action){
    switch(action.type){
        case 'login':
            return action.payload;
        case 'register':
            return action.payload;
        default:
            throw new Error('Unknown action type:'+action.type);
    }
}

export default reducer;
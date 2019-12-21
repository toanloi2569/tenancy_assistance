export default (state={}, action)=>{
    switch(action.type){
        case 'SELECT_HOME':
            return action.payload
        default:
            return []
    }

    

    
}
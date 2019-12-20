export const selectHome = (danhsach)=>{
    console.log("adadsa "+ danhsach.name);
    return{
        type: 'SELECT_HOME',
        payload: danhsach

    };

}
export const UtilityConstant = {
    isDev : true,
}


export const logFunction = (message) =>{
    if (UtilityConstant.isDev) {
        console.log(message)    
    }
}
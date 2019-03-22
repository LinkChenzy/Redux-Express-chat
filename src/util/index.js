

export function getRedirectPath({userType,avatar}){
    console.log(userType,avatar)
    let url = (userType === 'boss') ? 'boss' : 'genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}
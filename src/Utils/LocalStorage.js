const setUserInfo = (userInfo)=>{
    localStorage.token = userInfo.token;
    localStorage.firstName = userInfo.firstName;
    localStorage.lastName = userInfo.lastName;
}

export {
    setUserInfo
}
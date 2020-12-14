const setUserInfo = (userInfo)=>{
    localStorage.token = userInfo.token;
    localStorage.firstName = userInfo.firstName;
    localStorage.lastName = userInfo.lastName;
}

const cleanUserInfo = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
}

export {
    setUserInfo,
    cleanUserInfo
}
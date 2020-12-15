const setUserInfo = (userInfo)=>{
    localStorage.token = userInfo.token;
    localStorage.firstName = userInfo.firstName;
    localStorage.lastName = userInfo.lastName;
    localStorage.balance = userInfo.balance;
}

const cleanUserInfo = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("balance");
}

export {
    setUserInfo,
    cleanUserInfo
}
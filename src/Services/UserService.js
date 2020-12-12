const registerUser = (userData)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user/register`,{
            method:'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response=>{
            return response.json()
        }).then(response=>{
            if(response.success)resolve(response);
            else reject(response)
        }).catch(err=>{
            reject(err);
        })
    })
}

const loginUser = (credentials)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user/login`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic '+btoa(`${credentials.email}:${credentials.password}`)
            }
        }).then(response=>{
            return response.json()
        }).then(response=>{
            if(response.success)resolve(response);
            else reject(response)
        }).catch(err=>{
            reject(err);
        })
    })
}

export {
    registerUser,
    loginUser
}
import {HandleUnauthorized} from "../Utils/Authorization";

const createDte = (dteData)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/dte/create`,{
            method:'POST',
            body: JSON.stringify(dteData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':`Bearer ${localStorage.token}`
            }
        }).then(response=>{
            if(response.status===401){
                HandleUnauthorized();
                throw new Error(response.status)
            }
            return response.json()
        }).then(response=>{
            if(response.success)resolve(response);
            else reject(response)
        }).catch(err=>{
            console.log(err);
            // reject(err);
        })
    })
}

export {
    createDte
}
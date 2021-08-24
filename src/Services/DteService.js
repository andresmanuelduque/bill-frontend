import {HandleUnauthorized} from "../Utils/Authorization";

const createDte = (dteData)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/bill/create`,{
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
        })
    })
}

const payDte = (payData)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/bill/pay`,{
            method:'POST',
            body: JSON.stringify(payData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
        })
    })
}

const listDte = (page)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/bill/list?page=${page}`,{
            method:'POST',
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
        })
    })
}

const listDteByFrequency = (frequency)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/bill/list/frequency/${frequency}`,{
            method:'GET',
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
        })
    })
}

const getDteByToken = (token)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${process.env.REACT_APP_API_BASE_URL}/bill/token/${token}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
        })
    })
}

export {
    createDte,
    listDte,
    listDteByFrequency,
    getDteByToken,
    payDte
}

const validateEmail = (email)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateStringLength = (value,gte,lte)=>{
    const re = /^[a-zÀ-úA-Z]*$/g;
    let valid = false;
    if(re.test(value) && (value.length<=lte && value.length>=gte )){
        valid = true;
    }
    return valid;
}

const validateAlphanumericLength = (value,gte,lte)=>{
    let valid = false;
    if( (value.length<=lte && value.length>=gte )){
        valid = true;
    }
    return valid;
}

const validateNumberLength = (value,gte,lte)=>{
    const re = /^\d+$/;
    let valid = false;
    if(re.test(value) && (value.length<=lte && value.length>=gte )){
        valid = true;
    }
    return valid;
}

const validateOnlyNumber = (value)=>{
    const re = /^\d+$/;
    return (re.test(value) || value === "");
}
export {
    validateEmail,
    validateStringLength,
    validateNumberLength,
    validateAlphanumericLength,
    validateOnlyNumber
}
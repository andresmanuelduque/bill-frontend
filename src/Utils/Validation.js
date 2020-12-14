
const validateEmail = (email)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateStringLength = (value,gte,lte)=>{
    const re = /^[a-zÀ-úA-Z_ ]*$/g;
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

const validateNumberFloat = (value)=>{
    const re = /^-?\d*(\.\d+)?$/g;
    let valid = false;
    if(re.test(value) && value!==""){
        valid = true;
    }
    return valid;
}

const validateNumberOrPoint = (value)=>{
    const re = /^\d.*$/g;
    let valid = false;
    if(re.test(value) || value===""){
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

const validateNumberRange = (value,gte,lte)=>{
    const re = /^\d+$/;
    let valid = false;
    if(re.test(value) && (value<=lte && value>=gte )){
        valid = true;
    }
    return valid;
}

const validateOnlyNumber = (value)=>{
    const re = /^\d+$/;
    return (re.test(value) || value === "");
}

const validateIsBoolean = (value)=>{
    return (typeof value === "boolean");
}

export {
    validateEmail,
    validateStringLength,
    validateNumberLength,
    validateAlphanumericLength,
    validateOnlyNumber,
    validateNumberFloat,
    validateNumberOrPoint,
    validateNumberRange,
    validateIsBoolean
}
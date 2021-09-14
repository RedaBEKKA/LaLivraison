export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export const isPhone = telephone => {
    
    const te = /(0|\+213)[5-7]([0-9]{2}){4}$/;
    return te.test(telephone);
}

export const isLength = password => {
    if(password.length < 6) return true
    return false
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}



export const isName = fullName => {
    
    const te = /^([a-zA-Z]+[ ]?|[a-zA-Z]+['-]?[])+$/;
    return te.test(fullName);
}
const { isEmail, isEmpty } = require('../helpers/validation.helper')

/* register validator */
const store = (data) => {
    let errors = {}

    if (!data.f_name || isEmpty(data.f_name)) errors.f_name = "First Name is required."
    if (!data.l_name || isEmpty(data.l_name)) errors.l_name = "Last Name is required."

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isEmail(data.email)) errors.email = "Address isn't valid"

    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."
   

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/**login */
const login = async(data) => {
    let errors = {}

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isEmail(data.email)) errors.email = "Address isn't valid"
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = {
    store,
    login
}
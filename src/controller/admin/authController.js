const admins = require('../../models/admins')
const validators = require('../../validators/adminAuth.validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { FileUpload } = require('../../helpers/image.helper')


/**list */
const List = async(req, res, next) => {
    try {
        const results = await admins.find()
        res.status(201).json({
            status: true,
            data: results
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

/**register */ 
const Register = async (req, res, next) => {
    try {
        /* Check validity */
        const validate = await validators.store(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                error: validate.errors
            })
        }

        /**request form */
        const { f_name, l_name, email, password } = req.body

        /**check unique email */
        const isValidEmail = await admins.findOne({ email })
        if(isValidEmail){
            res.status(422).json({
                status: false,
                message: "Account Already Exists."
            })
        }

        /**hash password create*/
        const hashPassword = await bcrypt.hash(password, 10)

        /**image upload */
        const image = req.files.image
        const uploadImage = await FileUpload(image, './uploads/admin/')

        /**store in database */
        const newAdmin = new admins({
            f_name,
            l_name, 
            email, 
            password:hashPassword,
            image:uploadImage
        })
        await newAdmin.save()

        res.status(201).json({
            status: true,
            message: "Registration Successfully Done."
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    List,
    Register,
}
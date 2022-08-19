const admins = require('../../models/admins')
const validators = require('../../validators/adminAuth.validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { FileUpload, DeleteFile } = require('../../helpers/image.helper')


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

/**login */
const Login = async(req, res, next) => {
    try {
        /**check validity */
        const validate = await validators.login(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                error: validate.errors
            })
        }

        const { email, password } = req.body

        /* Account find using phone */
        const account = await admins.findOne({ email })
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password."
            })
        }    

        /* Compare with password */
        const result = await bcrypt.compare(password, account.password)
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password."
            })
        } 
        
        /* Generate JWT token */
        const token = await jwt.sign(
            {
                id: account._id,
                name: account.name,
                role: account.role,
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        )

        return res.status(200).json({
            status: true,
            token
        })

    } catch (error) {
        console.log(error);
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

//**Destroy */
const Destroy = async(req, res, next) => {
    try {
        const {id} = req.params
        const account = await admins.findByIdAndRemove(id)
        if(!account){
            res.status(404).json({
                status: false,
                message: "Account Dosn't Exists"
            })
        }

        await DeleteFile("./uploads/admin/", account.image)

        res.status(201).json({
            status:true,
            message: "Admin deleted"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


module.exports = {
    List,
    Login,
    Register,
    Destroy
}
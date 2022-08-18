const fs = require("fs")

/*Get dynamically host URL */
const Host = (req) => {
    return req.protocol + '://' + req.get('host') + '/'
}
 
/*file uploads */
const FileUpload = async (data, path) => {
    try {
        if(!data){
            return null
        }
        const image = data
        const newName = Date.now() + '.jpg'
        uploadPath = path + newName
        const moveFile = image.mv(uploadPath)
        if (moveFile) return newName
    } catch (error) {
        if (error) return error
    }
}

/*Delete file from directory */ 
const DeleteFile = (destination, file) => {
    fs.unlink(destination + file, function (error) {
        if (error) {
            return error
        }
        return
    })
}

module.exports = { 
    Host,
    FileUpload,
    DeleteFile
}
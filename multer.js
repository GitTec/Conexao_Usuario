import multer from "multer"

export const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + "_" + file.originalname ) 
    }
})
/*Essa parte é pra destinar a imagem pro arquivo de uploads e em baixo transformar
 o arquivo para o nome original*/
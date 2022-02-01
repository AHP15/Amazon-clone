import multer from "multer";
import util from "util";
import {GridFsStorage} from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.CONNECTION_URL,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) =>{
        const match = ["image/png", "image/jpeg"];
        /*
         *adding the [timestamp]-product- prefix to the file’s original name to make sure *that the duplicates never occur in MongoDB collection
        */
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-user-${file.originalname}`;
            return filename;
        }

        return {
           bucketName: "photos",
           filename: `${Date.now()}-user-${file.originalname}`
        };
    }
});

/*
 *using multer module to initialize middleware and util.promisify() to make the exported *middleware object can be used with async-await
*/
const uploadFiles = multer({storage}).single("avatar");
export default util.promisify(uploadFiles);
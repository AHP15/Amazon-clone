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

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-product-${file.originalname}`;
            return filename;
        }

        return {
           bucketName: "productImages",
           filename: `${Date.now()}-product-${file.originalname}`
        };
    }
});

const uploadFiles = multer({storage}).array("files",10);
export default util.promisify(uploadFiles);
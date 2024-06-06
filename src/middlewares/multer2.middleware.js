// this where u spent 3 days
// this is deployment multer middleware2
//issue was as u take image file it multer middleware(original not for deployment suitable for local) 
//it uploads the file to public/temp folder as this folder on github is readonly so multer was not able to add file 
//inside it thats why register not successful and internal server was coming.

import fs from 'fs';
import path from 'path';
import multer from 'multer';




// Ensure the /tmp/uploads directory exists
const ensureTmpUploadsDirectory = () => {
    const tmpUploadsDir = '/tmp/uploads';
    if (!fs.existsSync(tmpUploadsDir)) {
        fs.mkdirSync(tmpUploadsDir, { recursive: true });
    }
    return tmpUploadsDir;
};

// Update multer to use /tmp/uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tmpUploadsDir = ensureTmpUploadsDirectory();
        cb(null, tmpUploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ 
    storage, 
})
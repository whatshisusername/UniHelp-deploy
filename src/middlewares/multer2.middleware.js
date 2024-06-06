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
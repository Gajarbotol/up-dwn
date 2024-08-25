const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export default function handler(req, res) {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }
        res.status(200).json({ success: true, fileName: req.file.originalname });
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};

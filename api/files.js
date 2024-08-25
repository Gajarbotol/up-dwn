const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const directoryPath = path.join(process.cwd(), 'uploads');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list files' });
        }

        const fileDetails = files.map(file => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                size: stats.size,
                uploadTime: stats.mtime
            };
        });

        res.status(200).json({ files: fileDetails });
    });
}

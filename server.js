const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Cho phép CORS cho tất cả các route

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, './src/assets/images');
        cb(null, uploadPath); // Đảm bảo rằng đường dẫn này tồn tại
    },
    filename: function (req, file, cb) {
        // const filename = path.parse(file.originalname).name;
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Endpoint để tải lên tệp
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Không có tệp nào được tải lên.');
    }
    res.send({ filePath: `./src/assets/images/${req.file.filename}` });
});

// Route mặc định để kiểm tra trạng thái của server
app.get('/', (req, res) => {
    res.send('Server đang hoạt động');
});

// Khởi động server trên cổng 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Server đã được khởi động trên cổng ${port}`);
});

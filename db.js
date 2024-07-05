const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Tạo một instance của Express
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, './src/assets/images');
        cb(null, uploadPath); // Đảm bảo rằng đường dẫn này tồn tại
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Kết nối vào cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  port: '3306',
  database: 'book_db'
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


app.get('/genres', (req, res) => {
  const sql = 'SELECT * FROM genres';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.get('/user', (req, res) => {
  const sql = 'SELECT User.`userName`,`User`.`userPass`  FROM User';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});
app.get('/user', (req, res) => {
  const userID= req.body;
  const sql = ' SELECT User.`userName`,`User`.`userPass`  FROM User WHERE `userID`= ?';
  connection.query(sql,userID, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});
app.post('/user', (req, res) => {
  const newUser= req.body;
  const sql = 'INSERT INTO User SET ?';
  connection.query(sql, newUser, (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).json({ id: results.insertId, ...newUser });
  });
});

app.get('/bookgenre', (req, res) => {
  const sql = `SELECT * FROM bookgenres `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// app.get('/bookgenre', (req, res) => {
//   const sql = 'SELECT * FROM Genres JOIN BookGenres ON `Genres`.`genreID` = BookGenres.`genreID` JOIN books ON BookGenres.`bookID` = books.`bookID` WHERE books.`bookID`=`Genres`.`genreID`';
//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error querying database:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json(results);
//   });
// });
// app.get('/bookgenre', (req, res) => {
//   const sql = ' SELECT books.bookID, books.title, books.published_date, books.description, books.price, books.stock_quantity, books.image, Genres.genreID, Genres.name AS genreName  FROM books  JOIN BookGenres ON books.bookID = BookGenres.bookID  JOIN Genres ON BookGenres.genreID = Genres.genreID';
//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error querying database:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json(results);
//   });
// });

app.post('/bookgenre', (req, res) => {
  const { bookID, genreID } = req.body;
  const newBookGenres = { bookID, genreID };
  const sql = 'INSERT INTO BookGenres SET ?';

  connection.query(sql, newBookGenres, (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('BookGenre added successfully');
    res.status(201).json({ id: results.insertId, ...newBookGenres });
  });
});
app.get('/books/getgenre', (req, res) => {
  const genreID = req.query.genreID; // Access genreID from query parameters

  // Ensure genreID is present and numeric (optional step depending on your validation needs)
  if (!genreID || isNaN(genreID)) {
    res.status(400).json({ error: 'Invalid genreID' });
    return;
  }

  const sql = 'SELECT * FROM books JOIN Genres ON Genres.genreID = books.genreID WHERE books.genreID = ?';

  connection.query(sql, genreID, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});
app.get('/search', (req, res) => {
  const title = req.query.title;
 

  // Ensure genreID is present and numeric (optional step depending on your validation needs)
  if (!title) {
    res.status(400).json({ error: 'Invalid genreID' });
    return;
  }

  const sql = ' SELECT * FROM books WHERE title LIKE ?';
  connection.query(sql, [`%${title}%`], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  const sql = 'INSERT INTO books SET ?';
  connection.query(sql, newBook, (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).json({ id: results.insertId, ...newBook });
  });
});
app.post('/genres', (req, res) => {
  const genre = req.body;
  const sql = 'INSERT INTO genres SET ?';
  connection.query(sql, genre, (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).json({ id: results.insertId, ...genre });
  });
});
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});


app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM books WHERE bookID = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result[0]);
  });
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  const sql = 'UPDATE books SET ? WHERE bookID = ?';
  connection.query(sql, [updatedBook, id], (err, result) => {
    if (err) {
      console.error('Error updating database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ id, ...updatedBook });
  });
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM books WHERE bookID = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting from database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(204).send();
  });
});

// Endpoint để tải lên tệp
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Không có tệp nào được tải lên.');
    }
    res.send({ filePath: `./src/assets/images/${req.file.filename}` });
});

// Lắng nghe các yêu cầu HTTP trên cổng 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Khởi động server trên cổng 3001
const uploadPort = 3001;
app.listen(uploadPort, () => {
    console.log(`Upload server is running on http://localhost:${uploadPort}`);
});

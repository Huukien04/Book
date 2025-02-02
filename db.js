const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');
const http = require('http');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));
app.use(bodyParser.json());


// const{Server} =require('socket.io');
// const server = new Server({cors:{origin: 'http://localhost:4200'}});

// server.on('connection',(socket)=>{
//   console.log('connected');
// })

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {

  socket.on('message', (data) => {
    socket.broadcast.emit('received', {
      data: data,
      message: 'This is a test message from the server.',
    });
    //   .emit('received',{data:data,message:'This is a test message from server.'})
  })
  socket.on('disconnect', () => {

  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, './src/assets/images');
    cb(null, uploadPath);
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



app.get('/allUser', (req, res) => {
  const sql = 'SELECT * FROM User';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      res.json('that bai');
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
      res.json('that bai');
      return;
    }
    res.json(results);
  });
});
// app.get('/login', (req, res) => {
//   const sql = 'SELECT User.`userName`,`User`.`userPass`  FROM User';
//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error querying database:', err);
//       res.status(500).send('Internal Server Error');
//       res.json('that bai');
//       return;
//     }
//     res.json(results);
//   });
// });
// app.post('/login', (req, res) => {
//   const { userID, userPass } = req.body;
//   const sql = 'SELECT * FROM User WHERE userName = ? AND userPass = ?';

//   connection.query(sql, [userID, userPass   ], (err, results) => {
//     if (err) {
//       console.error('Error querying database:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     if (results.length > 0) {

//       const token = jwt.sign({ id: results[0].userID }, 'your_secret_key', { expiresIn: '1h' });

//       return res.json({ token , results });
//     } else {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }
//   });
// });


function authenticateLogin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':/');
  const userID = auth[0];
  const userPass = auth[1];

  req.body.userID = userID;
  req.body.userPass = userPass;
  next();
}


app.post('/login', (req, res)  => {
  const { userID, userPass } = req.body;
  const sql = 'SELECT * FROM User WHERE userName = ?';

  connection.query(sql, [userID], (err, results) => {
    // if (err) {
    //   console.error('Error querying database:', err);
    //   return res.status(500).json({ error: 'Internal Server Error' });
    // }

    if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(userPass, user.userPass, (err, match) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (match) {
          const token = jwt.sign({ id: user.userID, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

          res.cookie('token', token, {
            httpOnly: true, // Cookie không thể được truy cập qua JavaScript
            secure: false, // Chỉ gửi cookie qua HTTPS nếu môi trường là production
            path: '/',
            maxAge: 3600000 // Thời gian sống của cookie (1 giờ)
          });
          return res.json({ token, results: [user] });
        } else {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});


app.get('/getUser', authenticateToken, (req, res) => {
  const userID = req.user.id;

  const sql = 'SELECT * FROM User WHERE userID = ?';

  connection.query(sql, [userID], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});


function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}





app.post('/addCart', (req, res) => {
  const { bookID, userID } = req.body;

  const sql = 'INSERT INTO Cart SET ?';
  const newEntry = { bookID, userID };

  connection.query(sql, newEntry, (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Book added to Cart successfully');
    res.status(201).json({ id: results.insertId, ...newEntry });
  });
});




app.get('/addCart', (req, res) => {
  const { userID } = req.query;
  const sql = 'SELECT * FROM Cart JOIN User ON Cart.userID = User.userID JOIN Books ON Cart.bookID = Books.bookID WHERE Cart.userID = ?;'
  connection.query(sql, [userID], (err, results) => {
    if (err) {

      console.error('Error fetching from database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results);
    } else {

      res.status(404).send('Cart not found');
    }
  });
});


app.post('/register', (req, res) => {
  const newUser = req.body;


  bcrypt.hash(newUser.userPass, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    newUser.userPass = hash;

    console.log(newUser.userPass);


    // Check if the userName already exists
    const checkUserSql = 'SELECT * FROM User WHERE userName = ?';
    connection.query(checkUserSql, [newUser.userName], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length > 0) {
        // User already exists
        return res.status(409).json({ error: 'Username already exists' });
      }

      // Insert new user if userName does not exist
      const insertUserSql = 'INSERT INTO User SET ?';
      connection.query(insertUserSql, newUser, (err, results) => {
        if (err) {
          console.error('Error inserting into database:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        var token = jwt.sign({ _userID: results.insertId }, 'mk', { expiresIn: '60m' });
        return res.status(201).json({
          message: 'Registration successful',
          token: token,
          expiresIn: 3600,
          idToken: token,
          ...newUser
        });
      });
    });
  });
});



// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, 'mk');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// }

// app.use('/protected', authenticateToken, (req, res) => {
//   res.send('This is a protected route');
// });







app.get('/datboard/:token', (req, res, next) => {
  try {
    var token = req.params.token;
    var ketqua = jwt.verify(token, 'mk');
    if (ketqua) {
      next()
    }
  } catch (error) {
    return res.json('ban can pphai login');
  }
}), (req, res, next) => {
  console.error('111111e:');
}




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


app.get('/getTotalBookByGenre', (req, res) => {
  const sql = `SELECT 
    g.Name AS genreName,
    g.genreID AS a,
    SUM(b.stock_quantity) AS totalStockQuantity
FROM 
    Genres g
INNER JOIN 
    Books b ON b.genreID = g.genreID
GROUP BY 
    g.Name , g.genreID; `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});



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
  const genreID = req.query.genreID;

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


app.delete('/deleteCart/:cartID', (req, res) => {
  const { cartID } = req.params;
  const sql = 'DELETE FROM Cart WHERE cartID = ?';
  connection.query(sql, [cartID], (err) => {
    if (err) {
      console.log('Looix ', err);
      console.error('Error deleting from database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(204).send();
  });
})


app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Không có tệp nào được tải lên.');
  }
  res.send({ filePath: `./src/assets/images/${req.file.filename}` });
});


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const uploadPort = 3001;
app.listen(uploadPort, () => {
  console.log(`Upload server is running on http://localhost:${uploadPort}`);
});

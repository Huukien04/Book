

CREATE TABLE `books` (
  `bookID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `published_date` varchar(255) DEFAULT NULL,
  `description` text,
  `price` double DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `genreID` int DEFAULT NULL,
  PRIMARY KEY (`bookID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

use book_db;

INSERT INTO `genres`(``)


CREATE TABLE Authors (
    authorID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Genres (
    genreID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE User (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(255) UNIQUE,
    userPass VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User') NOT NULL DEFAULT 'User'
);

DROP TABLE User;
DROP TABLE Cart;

CREATE TABLE Cart (
    cartID INT PRIMARY KEY AUTO_INCREMENT,
    bookID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (bookID) REFERENCES Books(bookID),
    FOREIGN KEY (userID) REFERENCES User(userID), 
    UNIQUE (userID, bookID)
);

DROP TABLE User;
CREATE TABLE Userlogin (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    userPass VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) 
);


CREATE TABLE BookAuthors (
    bookID INT,
    authorID INT,
    PRIMARY KEY (bookID, authorID),
    FOREIGN KEY (bookID) REFERENCES Books(bookID),
    FOREIGN KEY (authorID) REFERENCES Authors(authorID)
);

  SELECT User.`userName`,`User`.`userPass`  FROM User

CREATE TABLE BookGenres (
    bookID INT,
    genreID INT,
    PRIMARY KEY (bookID, genreID),
    FOREIGN KEY (bookID) REFERENCES Books(bookID),
    FOREIGN KEY (genreID) REFERENCES Genres(genreID)
);

INSERT INTO Cart SET bookID = 16


SELECT * FROM Cart WHERE cartID = 1;
SELECT * FROM Cart JOIN User ON Cart.userID = User.userID JOIN Books ON Cart.bookID = Books.bookID WHERE  Cart.userID = 4;

DELETE FROM Cart WHERE cartID=6;
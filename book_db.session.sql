

CREATE TABLE Book_tb (
    id CHAR(36) PRIMARY KEY,
    title NVARCHAR(255),
    published_date DATETIME,
    description NVARCHAR(10000000),
    price DOUBLE,
    stock_quantity INTEGER,
    image NVARCHAR(255)
);


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
    userPass VARCHAR(255) NOT NULL
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


  


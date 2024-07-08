

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
INSERT INTO `books` (`bookID`, `title`, `published_date`, `description`, `price`, `stock_quantity`, `image`) 
VALUES (1, 'Hoa', '2022-02-02', 'gdfgdfg', 33232, 5, 'kinhdi.png');

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
    userName VARCHAR(255) NOT NULL,
    userPass VARCHAR(255) NOT NULL
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

 SELECT books.bookID, books.title, books.published_date, books.description, books.price, books.stock_quantity, books.image, Genres.genreID, Genres.name AS genreName     FROM books
    JOIN BookGenres ON books.bookID = BookGenres.bookID
    JOIN Genres ON BookGenres.genreID = Genres.genreID

    SELECT *
    FROM books
    JOIN Genres ON `Genres`.`genreID` = books.`genreID`
    WHERE books.`genreID` = 1;

  


    SELECT User.`userName`,`User`.`userPass`  FROM User WHERE `userID`=4;

 ALTER TABLE User ADD COLUMN token VARCHAR(255);            
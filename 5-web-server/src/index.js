const express = require("express"); //external module that will allow us to build a web server
const fs = require("fs").promises;

const app = express(); // Creating an instance of the express module so that we can use all the methods/functions and properties of express in our web server
const port = 3000; // Telling express which port to listen to to receive requests

app.use(express.json()); // This server will be receiving and responding in JSON

// Create the function that will turn on the server and listen for requests on this port
app.listen(port, () => {
    console.log(`My server is listening on port:${port}`);
});

//Sending a string
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

//Sending data
// app.get("/", (req, res) => {
//     const myData = {
//         id : 47,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

//Specify a route
// app.get("/user", (req, res) => {
//     const myData = {
//         id : 47,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Specify a route with a parameter
// app.get("/users/:user", (req, res) => {
//     const myData = {
//         id : req.params.user,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });


// Helper Functions
async function getAllBooks () {
    //Getting all of the book data
    const books = await fs.readFile("../data.json", "utf8");
    let parsedBooks = JSON.parse(books)
    console.log(parsedBooks);
    return parsedBooks;
}

async function getOneBook (id) {
    const books = await fs.readFile("../data.json", "utf8");
    let parsedBook = JSON.parse(books)
    console.log(parsedBook);
    return parsedBook[id];
}

async function deleteBook (id) {
    const books = await fs.readFile("../data.json", "utf8"); // Retreive all data from the JSON file
    let parsedBooks = JSON.parse(books); //Convert the JSON into JavaScript. 
    parsedBooks.splice(id, 1); //Use splice to remove the one book from our array
    // array.splice(startIndex, deleteCount)
    const stringBooks = JSON.stringify(parsedBooks); //Turn the array back into JSON
    await fs.writeFile("../data.json", stringBooks, "utf8") // Write our JSON to our file
}


// API Endpoints

//The client has requested all of the books 
app.get("/get-all-books", async (req, res) => {
    const books = await getAllBooks();
    res.send(JSON.stringify(books));
});

app.get("/get-one-book/:id", async (req, res) => {
    const book = await getOneBook(req.params.id);
    res.send(JSON.stringify(book));
});

app.get("/delete-book/:id", async (req, res) => {
    await deleteBook(req.params.id);
    res.send("You deleted the book!")
})


// Steps for creating a Node/Express server
// 1. In your project folder, run npm init
// 2. Install express by running npm install express
// 3. Add a .gitignore to our project for the node_modules
// 4. Create a src folder to hold our custom JS code, create a index.js file to store all of our web server code.
// 5. Add all of your import statements (3rd party modules, Node modules, your custom modules)
// 6. Add the "boilerplate" code for Express, creating the instance, adding the port, adding the listener
// 7. Add API endpoints + helper functions
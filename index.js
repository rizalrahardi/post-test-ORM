const express = require('express');
const app = express()
const port = 3000
const { Book } = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/books', (req, res) => {
    Book.findAll()
    .then(books => {
        res.status(200).json(books)
    })
})

app.get('/books/:id', (req, res) => {
    Book.findOne({
        where: { id: req.params.id }
    })
    .then(book => {
        res.status(200).json(book)
    })
})

app.post('/books', (req, res) => {
    Book.create({
        isbn: req.body.isbn,
        judul: req.body.judul,
        sinopsis: req.body.sinopsis,
        penulis: req.body.penulis,
        genre: req.body.genre,
        approved: req.body.approved
    })
    .then(book => {
        res.status(201).json("Create a new book")
    })
    .catch(err => {
        res.status(422).json("Can't create book")
    })
})

app.put('/books/:id', (req, res) => {
    Book.update({
        isbn: req.body.isbn,
        judul: req.body.judul,
        sinopsis: req.body.sinopsis,
        penulis: req.body.penulis,
        genre: req.body.genre,
        approved: req.body.approved
    }, {
        where: { id: req.params.id }
    })
    .then(() => {
        res.status(201).json("Update succesfully")
    })
    .catch(err => {
        res.status(422).json("Can't update book")
    })
})

app.delete('/books/:id', (req, res) => {
    Book.destroy({
        where: { id : req.params.id}
    })
    .then(() => {
        res.status(201).json("Delete succesfully")
    })
    .catch(err => {
        res.status(422).json("Can't Delete book")
    })
})

app.listen(port, () => {
    console.log('server ready')
})
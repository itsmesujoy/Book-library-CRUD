const router = require('express').Router();
const bookModel = require('../model/book_model');

router.get('/books', async function (req, res, next) {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const books = await bookModel.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await bookModel.countDocuments(query);

        res.json({
            books,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
        });
    }
    catch (err) {
        next(err)
    }
});

router.get('/books/:id', async function (req, res) {
    const { id } = req.params;
    const book = await bookModel.findOne({ _id: id });
    if (!book) return res.send("Book Not Found");
    res.send(book);
});

router.post('/books', async function (req, res, next) {
    const {
        name,
        author,
        publishedYear,
        price,
        status
    } = req.body
    try {
        const data = await bookModel.create({
            name,
            author,
            publishedYear,
            price,
            status
        });
        data.save();

        res.send("Book Uploaded");
    }
    catch (err) {
        next(err)
    }
});


router.put('/books/:id', async function (req, res, next) {
    try {

        const { id } = req.params;
        const {
            name,
            author,
            publishedYear,
            price,
            status
        } = req.body;

        let bookExist = await bookModel.findOne({ _id: id });
        if (!bookExist) return res.send('Book Do Not exist');
        const updatedBook = {
            ...bookExist.toJSON(),
            name,
            author,
            publishedYear,
            price,
            status
        };
        delete updatedBook._id
        delete updatedBook.__v
        await bookModel.updateOne({ _id: id }, { $set: { ...updatedBook } })
        const updated = await bookModel.findOne({ _id: id });
        res.status(200).json({
            message: "Book Updated",
            data: updated
        });
    }
    catch (err) {
        next(err)
    }
});

router.delete('/books/:id', async function (req, res) {
    const { id } = req.params;

    const bookExist = await bookModel.findOne({ _id: id });
    if (!bookExist) return res.send('Book Do Not exist');

    await bookModel.deleteOne({ _id: id }).then(function () {
        console.log("Data deleted");
        res.send("Book Record Deleted Successfully")
    }).catch(function (error) {
        console.log(error); 
    });
});

module.exports = router;
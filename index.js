
const express = require('express');
const app = express();
const port = 4000;
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home route to display users
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/users');
        res.render('index', { users: response.data });
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Route to display form to add new user
app.get('/users/new', (req, res) => {
    res.render('new');
});

// Route to handle creation of a new user
app.post('/users', async (req, res) => {
    try {
        await axios.post('http://localhost:3000/users', req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

// Route to display form to edit an existing user
app.get('/users/edit/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${req.params.id}`);
        res.render('edit', { user: response.data });
    } catch (error) {
        res.status(500).send('Error fetching user data');
    }
});

// Route to handle updating an existing user
app.post('/users/edit/:id', async (req, res) => {
    try {
        await axios.put(`http://localhost:3000/users/${req.params.id}`, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

// Route to handle deletion of a user
app.post('/users/delete/:id', async (req, res) => {
    try {
        await axios.delete(`http://localhost:3000/users/${req.params.id}`);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});

app.listen(port, () => {
    console.log(`Frontend server is running at http://localhost:${port}`);
});

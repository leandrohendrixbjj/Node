const express = require('express')
const routes = require('./routes/routes')
const mongoConnect = require('./util/database').mongoConnect

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // form HTML
app.use(express.json());                         // Postman (raw JSON)
app.use(routes);

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = status === 500 ? 'Erro interno do servidor' : err.message;

    if (req.is('application/json')) {
        return res.status(status).json({ message });
    }

    res.status(status).send(message);
});

mongoConnect(() => {
    app.listen(port)
})

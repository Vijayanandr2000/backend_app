const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());

const PORT = config.PORT;

require('./router/index')(app)

module.exports = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
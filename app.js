const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const makananRoutes = require('./routes/makananRoutes');
const minumanRoutes = require('./routes/minumanRoutes');
const pesananRoutes = require('./routes/pesananRoutes');
const userRoutes = require('./routes/userRoutes');
const payloadParsing = require('./middleware/payloadParse');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(makananRoutes);
app.use(minumanRoutes);
app.use(pesananRoutes);
app.use(userRoutes);
app.use(payloadParsing);



app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});


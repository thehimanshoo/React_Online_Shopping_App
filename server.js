const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

// configure cors
app.use(cors());

// configure express to receive form data
app.use(express.json());

// configure dotEnv
dotEnv.config({path : './.env'});

const port = process.env.PORT || 5000;

// configure mongodb connection
mongoose.connect(process.env.MONGO_DB_CLOUD_URL, {
    useUnifiedTopology :true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useCreateIndex : true
}).then((response) => {
    console.log('Connected to MongoDB Cloud Successfully......');
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

// simple request
app.get('/', (request , response) => {
    response.send(`<h2>Welcome to Online Shopping Application Backend</h2>`);
});

// router configuration
app.use('/api/users' , require('./router/userRouter'));
app.use('/api/products' , require('./router/productRouter'));
app.use('/api/orders' , require('./router/orderRouter'));
app.use('/api/payments' , require('./router/paymentRouter'));

app.listen(port, () => {
    console.log(`Express Server is started at PORT : ${port}`);
});
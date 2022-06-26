import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

//import routes
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

//error middleware
import errorMiddlewar from './middlewares/error.js';

app.use(errorMiddlewar);

export default app;

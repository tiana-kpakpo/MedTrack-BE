import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './config/swagger.js'
import { connectDB } from './config/db.js';
import User from './routes/user.js'
import Drug from './routes/drug.js'
import Lab from './routes/lab.js'

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}))

// app.use(cookieParse());
app.use(express.urlencoded({ extended: false }));

//middleware
app.use('/api/user', User)
app.use('/api/drug', Drug)
app.use('/api/lab', Lab)

const spec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

connectDB();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))


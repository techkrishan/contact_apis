require("dotenv").config();
import express from 'express';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.routes';

const app = express();
const PORT = process.env.PORT ?? 8900;

mongoose.connect('mongodb://localhost:27017/my_contacts', {});

app.use(express.json());

app.use(contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

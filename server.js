import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './src/routes/api';

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/netflix');
  console.log(`Database connect successful`);
}

const app = express();
const port = 3000;

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port localhost:${port}`);
});

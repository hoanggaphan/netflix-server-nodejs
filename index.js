import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './src/routes/api.js';

main().catch((err) => console.log(err));
async function main() {
  // const uri = 'mongodb://localhost:27017/netflix';
  const uri =
    'mongodb+srv://hloveh3k:hloveh3k@cluster0.kgurc.mongodb.net/netflix?retryWrites=true&w=majority';
  await mongoose.connect(uri);
  console.log(`Database connect successful`);
}

const app = express();
const port = 3000;

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port localhost:${port}`);
});

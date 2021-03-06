import server from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = 3333 || process.env.PORT ;


server.listen(port, function () {
  console.log(`listening on ${port}`);
});

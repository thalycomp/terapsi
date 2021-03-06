import server from './app';
import dotenv from 'dotenv';

dotenv.config();

server.listen(process.env.PORT || 3333, function () {
  console.log(`listening on ${process.env.PORT || 3333}`);
});

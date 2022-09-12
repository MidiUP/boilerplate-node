import { setupApp } from './config/app';
import 'dotenv/config';
import '../infra/db/sql-server';

const app = setupApp();

app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`),
);

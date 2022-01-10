import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';

const app = express();

const adminJS = new AdminJS({
  databases: [],
  rootPath: '/admin',
  resources: []
});

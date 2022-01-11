import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';

const app = express();

const adminJS = new AdminJS({
  databases: [],
  rootPath: '/admin',
  resources: []
});

const router = AdminJSExpress.buildRouter(adminJS);

app.use(adminJS.options.rootPath, router);
app.listen(5001, () => {
  console.log('AdminJS is under http://localhost:5001/admin');
});

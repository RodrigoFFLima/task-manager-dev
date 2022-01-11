import 'dotenv/config';

import './database';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminsJSSequelize from '@adminjs/sequelize';
import express from 'express';

import UsersResource from './resources/UsersResource';

AdminJS.registerAdapter(AdminsJSSequelize);

const app = express();

const adminJS = new AdminJS({
  databases: [],
  rootPath: '/admin',
  resources: [UsersResource]
});

const router = AdminJSExpress.buildRouter(adminJS);

app.use(adminJS.options.rootPath, router);
app.listen(5001, () => {
  console.log('AdminJS is runnig in http://localhost:5001/admin');
});

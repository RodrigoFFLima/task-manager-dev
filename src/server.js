import 'dotenv/config';

import './database';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminsJSSequelize from '@adminjs/sequelize';
import express from 'express';

import UsersResource from './resources/UsersResource';
import ProjectsResource from './resources/ProjectsResource';
import TasksResource from './resources/TasksResource';

import User from './models/user';

import locale from './locales';

AdminJS.registerAdapter(AdminsJSSequelize);

const app = express();

const adminJS = new AdminJS({
  databases: [],
  rootPath: '/admin',
  resources: [UsersResource, ProjectsResource, TasksResource],
  ...locale
});

//const router = AdminJSExpress.buildRouter(adminJS);
const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      return user;
    }

    return false;
  },
  cookiePassword: process.env.SECRET
});

app.use(adminJS.options.rootPath, router);
app.listen(5001, () => {
  console.log('AdminJS is runnig in http://localhost:5001/admin');
});

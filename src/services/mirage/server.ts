import { Server, Model, Factory, Response, belongsTo, hasMany } from 'miragejs';
import user from './routes/user';
import * as diary from './routes/diary';


export const handleErrors = (error: any, message = 'An error ocurred') => {
  console.error('Error: ', error);
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};


export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? 'development',

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: 'test',
        password: 'password',
        email: 'test@email.com',
      }),
    },

    seeds: (server): any => {
      server.create('user');
    },

    routes(): void {
      this.urlPrefix = 'https://diaries.app';

      this.get('/diaries/entries/:id', diary.getEntries);
      this.get('/diaries/:id', diary.getDiaries);

      this.post('/auth/login', user.login);
      this.post('/auth/signup', user.signup);

      this.post('/diaries/', diary.create);
      this.post('/diaries/entry/:id', diary.addEntry);

      this.put('/diaries/entry/:id', diary.updateEntry);
      this.put('/diaries/:id', diary.updateDiary);
    },
  });
};
//In this file, we are exporting two functions. A utility function for handling errors,
//and setupServer(),which returns a new server instance.
//The setupServer() function takes an optional argument which can be used to change
//the server’s environment. You can use this to set up Mirage for testing later.
//We have also defined three models in the server’s models property: User, Diary and Entry.
//Remember that earlier we set up the Entry interface with a property named diaryId. This value will be
//automatically set to the id the entry is being saved to. Mirage uses this property to establish a
//relationship between an Entry and a Diary. The same thing also happens when a user creates 
//a new diary: userId is automatically set to that user’s id.
//We seeded the database with a default user and configured Mirage to intercept all requests
//from our app starting with https://diaries.app. 
//Notice that we haven’t configured any route handlers yet. Let’s go ahead and create a few.
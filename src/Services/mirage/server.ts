import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';
import user from './routes/user';
import * as diary from './routes/diary';

//If error ocurred
export const handleErrors = (error: any, message = 'An error ocurred') => {
    return new Response(400, undefined, {
        data: {
            message,
            isError: true,
        },
    });
};


// hasMany()
// use for defining to - many relationships
// belongsTo()
// use for defining to - one relationships

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
            dairy: Factory.extend({
                title: 'abcd',
                type: 'public',
                userId: '1'
            })
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

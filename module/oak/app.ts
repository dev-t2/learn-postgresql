import { Application } from 'https://deno.land/x/oak/mod.ts';

import AppController from './app.controller.ts';

const app = new Application();

app.use(AppController.routes());
app.use(AppController.allowedMethods());

console.log('http://localhost:8000/');

await app.listen({ port: 8000 });

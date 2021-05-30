import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

interface IBook {
  id: string;
  title: string;
  author: string;
}

const books: IBook[] = [
  { id: '1', title: 'Book One', author: 'One' },
  { id: '2', title: 'Book Two', author: 'Two' },
  { id: '3', title: 'Book Three', author: 'Three' },
];

const router = new Router();

router.get('/', ({ response }) => {
  response.body = books;
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('http://localhost:8000/');

await app.listen({ port: 8000 });

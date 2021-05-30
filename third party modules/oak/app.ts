import { Application, Router, Status } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std@0.97.0/uuid/mod.ts';

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

router.get('/', context => {
  context.response.body = 'Hello world';
});

router.get('/books', context => {
  context.response.body = books;
});

router.post('/book', async context => {
  if (!context.request.hasBody) {
    context.throw(Status.BadRequest, 'Bad Request');
  }

  const body = await context.request.body();
  const book: IBook = await body.value;

  book.id = v4.generate();
  books.push(book);

  context.response.status = Status.Created;
  context.response.body = book;
});

router.get('/book/:id', context => {
  const book = books.find(book => book.id === context.params.id);

  if (!book) {
    context.throw(Status.NotFound, 'Not Found');
  }

  context.response.body = book;
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('http://localhost:8000/');

await app.listen({ port: 8000 });

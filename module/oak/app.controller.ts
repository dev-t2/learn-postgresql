import { Router, Status } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std@0.97.0/uuid/mod.ts';

import { IBook } from './app.interface.ts';

const books: IBook[] = [
  { id: '1', title: 'Book One', author: 'One' },
  { id: '2', title: 'Book Two', author: 'Two' },
  { id: '3', title: 'Book Three', author: 'Three' },
];

const AppController = new Router();

AppController.get('/', context => {
  context.response.body = 'Hello world';
});

AppController.get('/books', context => {
  context.response.body = books;
});

AppController.post('/book', async context => {
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

AppController.get('/book/:id', context => {
  const book = books.find(book => book.id === context.params.id);

  if (!book) {
    context.throw(Status.NotFound, 'Not Found');
  }

  context.response.body = book;
});

export default AppController;

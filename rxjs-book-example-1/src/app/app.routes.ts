import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';
import { BookDetailsPage } from './book-list/book/details/book-details';

export const routes: Routes = [
  {
    title: 'Books',
    path: '',
    component: BookList,
  },
  {
    path: 'books',
    redirectTo: '',
  },
  {
    title: 'Book detail',
    path: 'book/:id',
    component: BookDetailsPage,
  },
];

import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  switchMap,
  tap,
  finalize,
  catchError,
  of,
  filter,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { BookService } from '../service/book.service';
import { Book } from '../interface/book.interface';
import { BookPage as FwdlBook } from './book/book';
import { Spinner } from '../util/spinner/spinner';

@Component({
  imports: [AsyncPipe, ReactiveFormsModule, FwdlBook, Spinner],
  selector: 'fwdl-book-list',
  templateUrl: 'book-list.html',
  styleUrl: 'book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);

  private readonly INITIAL_SEARCH = '';
  private readonly DEBOUNCE_TIME_IN_MS = 300;

  protected readonly search = this.fb.nonNullable.control<string>(this.INITIAL_SEARCH);

  protected readonly searched = signal<string>('');
  protected readonly isLoading = signal<boolean>(false);
  protected readonly isRecent = signal<boolean>(true);
  protected readonly recentBooks = signal<Book[]>([]);


  
  protected readonly books$ = null // boeken nog op te halen
  protected readonly recentBooks$ = null // boeken nog op te halen

  protected onShowRecent(): void {
    this.isRecent.set(true);
    this.search.setValue('');
  }

  ngOnInit(): void {
  }

}

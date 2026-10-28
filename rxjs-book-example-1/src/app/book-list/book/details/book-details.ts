import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Spinner } from '../../../util/spinner/spinner';
import { BookDetails } from '../../../interface/book.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'fwdl-book-details',
  templateUrl: 'book-details.html',
  styleUrl: 'book-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Spinner, AsyncPipe],
})
export class BookDetailsPage {
  private readonly bookService = inject(BookService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly id = signal<string | null>(this.activatedRoute.snapshot.paramMap.get('id'));

  protected readonly isLoading = signal<boolean>(true);
  protected readonly details$ = new Observable<BookDetails>(); //TODO details nog op te halen
}

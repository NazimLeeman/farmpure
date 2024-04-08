import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, shareReplay } from 'rxjs';

/**
 * A generic service for PostgREST CRUD operations over HTTP.
 * @template T The type of the entities managed by this service.
 */
@Injectable({
  providedIn: 'root'
})
export class PGService<T> {
  /**
   * The HttpClient used to make HTTP requests.
   */
  private http = inject(HttpClient);

  /**
   * Constructs a new instance of the service.
   * @param apiUrl The base URL of the API to which requests are made.
   * @param http The HttpClient injection for making HTTP requests.
   */
  constructor(
    @Inject(String) private apiUrl: string,
    http: HttpClient
  ) {
    this.http = http;
  }

  /**
   * A stream of items of type T, shared among multiple subscribers.
   */
  items$ = this.http
    .get<T[]>(`${this.apiUrl}`)
    .pipe(shareReplay(1));

  /**
   * A signal representing the current value of items$, providing a reactive alternative to traditional promises.
   */
  items = toSignal(this.items$, {
    initialValue: [] as T[],
  });

  /**
   * Updates an item of type T identified by `id`.
   * @param id The identifier of the item to be updated.
   * @param item The updated item.
   * @returns An Observable of the HTTP response.
   */
  patch(id: number | string, item: T): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}?id=eq.${id}`, item);
  }

  /**
   * Retrieves an item of type T by its `id`.
   * @param id The identifier of the item to retrieve.
   * @returns An Observable of the retrieved item.
   */
  get(id: number | string): Observable<T> {
    return this.http
      .get<T[]>(`${this.apiUrl}?id=eq.${id}`)
      .pipe(map((items) => items[0]));
  }

  /**
   * Creates a new item of type T.
   * @param item The item to create.
   * @returns An Observable of the HTTP response.
   */
  post(item: T): Observable<any> {
    const headers = new HttpHeaders({
      'Prefer': 'return=representation'
    });
    return this.http.post<any>(this.apiUrl, item, { headers });
  }

  /**
   * Deletes an item of type T identified by `id`.
   * @param id The identifier of the item to delete.
   * @returns An Observable of the HTTP response.
   */
  delete(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=eq.${id}`);
  }
}

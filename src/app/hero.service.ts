import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, map, tap, Observable } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
 
  private heroesUrl = 'api/heroes'
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  addHero(hero: Hero) {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added her w/ id= ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }
  deleteHero(id: number) {
    const url = `${this.heroesUrl}/${id}}`;
    
  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
  }
  
  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }


  
  getHero(id: number) {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  constructor(
    private messageService : MessageService,
    private http: HttpClient
  ) { }

  getHeroes() {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap( _ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )
  }
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }
  private handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
}

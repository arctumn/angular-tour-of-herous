import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHero(id: number) {
    const hero = HEROES.find(hero => hero.id === id)!
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }

  constructor(
    private messageService : MessageService
  ) { }

  getHeroes() {
    const heroes = of(HEROES)
    this.messageService.add("HeroService: fetched heroes")
    return heroes
  }
}

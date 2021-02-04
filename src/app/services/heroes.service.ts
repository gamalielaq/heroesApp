import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudapp-101a2.firebaseio.com'

  constructor(
    private _http: HttpClient
  ) { }


  createHeroe(herore: HeroeModel) {
    return this._http.post(`${this.url}/heroes.json`, herore)
      .pipe(
        map((resp: any) => {
          herore.id = resp.name
          return herore;
        })
      );
  }

  updateHerore(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this._http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

deleteHeroe(id: string) {
  return this._http.delete(`${this.url}/heroes/${id}.json`)
}

  getHeroById(id: string) {

    return this._http.get(`${this.url}/heroes/${id}.json`)

  }

  getHeroes() {
    return this._http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1500)
      )
  }

  private crearArreglo(heroesObj: Object) {

    const heroes: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }

}


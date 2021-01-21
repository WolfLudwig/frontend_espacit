import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RessourceType } from '../models/ressourceType.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RessourceTypeService {
  constructor(private http: HttpClient) { }

  private typeRess: RessourceType[] =
    [
      {
        _id: '1234',
        title: 'salut',
        description: 'une desc'

      },
    ];


  public rsType$ = new Subject<RessourceType[]>();



  getRessourceTypeById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/ressourceType/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllRessourceTypes() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/ressourceType').subscribe(
        (ress: RessourceType[]) => {
          if (ress) {
            this.typeRess = ress;
            this.emitRessourceType();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });

  }
  emitRessourceType() {
    this.rsType$.next(this.typeRess);
  }
}

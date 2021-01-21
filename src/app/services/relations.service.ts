import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Relation } from '../models/relation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
  constructor(private http: HttpClient) { }

  private rel: Relation[] =
    [
      {
        _id: '1234',
        title: 'salut',
        description: 'une desc'

      }
    ];


  public rel$ = new Subject<Relation[]>();

  getRelationById(id: string) {
    return new Promise<Relation>((resolve, reject) => {
      this.http.get('http://localhost:3000/api/relation/' + id).subscribe(
        (relation: Relation[]) => {
          if (relation) {
            this.rel = relation;
            this.emitRelation();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  emitRelation(): void {
    this.rel$.next(this.rel);

  }


  getRelationByTitle(title: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/relation/' + title).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getAllRelations() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/relation').subscribe(
        (rela: Relation[]) => {
          if (rela) {
            this.rel = rela;
            this.emitRelations();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });

  }
  emitRelations(): void {
    this.rel$.next(this.rel);
  }
}

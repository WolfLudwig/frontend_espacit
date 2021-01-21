import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  private cat: Category[] =
    [
      {
        _id: '1234',
        title: 'salut',
        description: 'une desc'

      },
    ];


  public cat$ = new Subject<Category[]>();

  getCategoryById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/category/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllCategories() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/category').subscribe(
        (cate: Category[]) => {
          if (cate) {
            this.cat = cate;
            this.emitCategories();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });

  }
  emitCategories(): void {
    this.cat$.next(this.cat);
  }

}

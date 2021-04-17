import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reports } from '../models/reports';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
constructor(private http: HttpClient) {}

  private reports : Reports[] = 
  [];

  private report : Reports;

  
  public reps$ = new Subject<Reports[]>();
  public rep$ = new Subject<Reports>();

//   getUser() {
//     this.http.get('http://localhost:3000/api/post').subscribe(
//       (stuff: Users[]) => {
//         if (stuff) {
//           this.usr = stuff;
//           alert("je suis dans getUser");
//           this.emitUser();
//         }
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

  deleteReport(id : String)
  {
    console.log("Avant d'envoyer au back")
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:4000/api/report/' + id).subscribe(
        (report : Reports[]) => {
          if (report) {
            this.getAllReports();
          } 
        },
        (error) => {
          reject(error);
        }
      );
    });

  }


   getAllReports()
  {
    console.log("dans le getAll cat");
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/report').subscribe(
        (report : Reports[]) => {
          if (report) {
            resolve(report);
            console.log(report)
            this.reports = report;
            console.log(this.reports);
            
            this.emitReports();
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }
  emitReports() {
    this.reps$.next(this.reports);
  }

  confirmReportPost(idPost : String, idReport : String)
  {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/report/', {idPost, idReport}).subscribe(
        (report : Reports[]) => {
          if (report) {
            this.getAllReports();
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  cancelReportPost(idPost : String, idReport : String)
  {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/report/cancel/', {idPost, idReport}).subscribe(
        (report : Reports[]) => {
          if (report) {
            this.getAllReports();
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }



  

//   getAllUsers()
//   {
//     return new Promise((resolve, reject) => {
//       this.http.get('http://localhost:3000/api/users').subscribe(
//         (friends : Users[]) => {
//           if (friends) {
//             this.usr = friends;
//             console.log(friends);
//             this.emitFriends();
//           } 
//         },
//         (error) => {
//           console.log(error);
//           reject(error);
//         }
//       );
//     });

//   }


//   emitFriends() {
//     this.usr$.next(this.usr);
//   }

//   getAllFriends(id : string)
//   {
//     console.log(id + " identifiant récupéré ");
//     return new Promise((resolve, reject) => {
//       this.http.get('http://localhost:3000/api/users/myFriends/'+ id).subscribe(
//         (friends : Users[]) => {
//           if (friends) {
//             this.myFriends = friends;
//             console.log(this.myFriends);
//             this.emitMyFriends();
//           } 
//         },
//         (error) => {
//           console.log(error);
//           reject(error);
//         }
//       );
//     });
//   }

//   emitMyFriends() {
//     this.frd$.next(this.myFriends);
//   }



}
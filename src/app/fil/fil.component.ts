import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fil',
  templateUrl: './fil.component.html',
  styleUrls: ['./fil.component.css']
})
export class FilComponent implements OnInit {

  public ressources = [
    {
      nom: 'Shiba', heure: '18/01/2021 | 14h00 ', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      contenu: '', aime: 2, comments: [1, 2, 3, 4, 5], partage: 1, enregistrement: 6
    },
    {
      nom: 'Shiba', heure: '18/01/2021 | 14h00 ', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      contenu: '', aime: 2, comments: 5, partage: 1, enregistrement: 6
    },
    {
      nom: 'Shiba', heure: '14h00 18/01/2021 ', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      contenu: '', aime: 2, comments: 5, partage: 1, enregistrement: 6
    }
  ];
  constructor() { }

  ngOnInit(): void {
    // TODO: WS recup ressources
  }

}

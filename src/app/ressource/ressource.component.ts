import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { RessourceService } from '../services/ressources.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  public ressources: Ressource[] = [];
  public comme: Comment[] = [];

  public myObservable = from(this.ressources);
  public ress: Ressource = new Ressource();
  public comm: Comment;
  private ressourcesSub: Subscription;
  private commsSub: Subscription;
  commentForm: FormGroup;

  constructor(private ressourceService: RessourceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.commentForm = this.formBuilder.group({
      userComm: [null],
    });

    this.ressourcesSub = this.ressourceService.currentPost$.subscribe(
      (ress) => {
        this.ressources = ress;
      }
    );
    this.ressourceService.getAllPosts();


  }

  like(id: string): void {

    this.ressourceService.getPostById(id)
      .then((ressour: Ressource) => {
        this.ress = ressour;
      });

    this.ressourceService.addLike(this.ress);
  }

  addComment(idRess: string, idPoster: string, pseudo: string): void {

    const infos = [];
    infos.push({ idress: idRess, posterId: idPoster, posterName: pseudo, message: this.commentForm.get('userComm').value });

    this.ressourceService.createNewComm(infos);
  }
}

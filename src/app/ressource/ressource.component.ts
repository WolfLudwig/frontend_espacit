import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { from, interval, Observable, of, Subscription } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { CommentService } from '../services/comment.service';
import { RessourceService } from '../services/ressources.service';
import {Comment } from '../models/comment.model';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  public ressources : Ressource[] = [];
  public comme : Comment[] = [];
  
  public myObservable = from(this.ressources);
  public ress : Ressource = new Ressource();
  public comm : Comment;
  private ressourcesSub: Subscription;
  private commsSub: Subscription;
  commentForm : FormGroup;

  constructor(private ressourceService : RessourceService,
    private router: Router,
    private route: ActivatedRoute,
    private commService : CommentService,
    private formBuilder: FormBuilder,
    ) { }

    ngOnInit(){

      this.commentForm = this.formBuilder.group({
        userComm: [null],
      });

    this.ressourcesSub = this.ressourceService.currentPost$.subscribe(
      (ress) => {
        console.log(ress);
        this.ressources = ress;
      }
    );
    this.ressourceService.getAllPosts();

       
    }

    like(id : string)
    {
      
      this.ressourceService.getPostById(id)
        .then((ressour : Ressource) => {
          this.ress = ressour;
          console.log(this.ress);
        })
      
      this.ressourceService.addLike(this.ress);
    }

    addComment(idRess : string, idPoster : string, pseudo : string)
    {

      const infos = [];
      infos.push({idress : idRess, posterId : idPoster,posterName :  pseudo, message : this.commentForm.get('userComm').value});

      this.ressourceService.createNewComm(infos);
    }
}

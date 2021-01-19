import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public postForm = new FormGroup({ message: new FormControl('', Validators.required), file: new FormControl(null) });
  /** Fichier à uploader */
  private fileToUpload: File;
  /** Nom à afficher du document */
  public nomDoc = null;
  constructor() { }

  ngOnInit(): void {
  }
  /** Procédure d'affichage du nom du document sélectionné à l'ajout */
  public affNomDoc(): void {
    this.nomDoc = this.postForm.get('file').value.split('\\')[2];
  }
  /**
   * Procédure de sauvegarde du fichier à uploader
   * @param FileList files
   */
  public onFileUpload(files: FileList): void {
    this.fileToUpload = files.item(0);
  }
  public delFile(): void {
    this.fileToUpload = null;
    this.nomDoc = null;
  }
  public sendPost(): void {
    console.log(this.postForm);
    // TODO: WS envoi
    this.postForm.get('message').setValue('');
    this.postForm.get('file').setValue(null);
    this.nomDoc = null;
    this.fileToUpload = null;
  }
}

import { Users } from "./user.model";
import {Relation} from "./relation.model";
import {Category } from "./category.model";
import {RessourceType } from "./ressourceType.model";

export class Ressource {
  static fromJson(jsonItem: Ressource): any {
    throw new Error('Method not implemented.');
  }
  _id : String;
  posterId: String;
  posterPseudo: String;
  message: String;
  picture:  String;
  video:  String;
  likers: [{_id : String,
            pseudo : String,
            email : String}];
  comments: [ 
    {
        commenterId : String,
        commenterPseudo : String;
        text : String;
    }
  ]
  relation : [Relation];       
  category : Category;
  ressourceType : [RessourceType];

}
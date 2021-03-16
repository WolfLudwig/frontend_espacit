import {Relation} from "./relation";
import {Category } from "./category";
import {RessourceType } from "./ressourceType";

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
  description : String;
  likers: [{_id : String,
            pseudo : String,
            email : String}];
    comments:  
    [
      {
          commenterId : String,
          commenterPseudo : String;
          text : String;
      }
    ]
    ;
    answers : 
    {
      commId : String;
      answId : String;
      commenterIdent :String;
      commPseudo : String;
      answerId : String;
      answerPseudo : String;
      answertext : String;
    };
    thread : 
    {
              threadPostId : String;
              threadAsnwId :String;
              threadPseudo : String;
              threadMyId : String;
              threadMyPseudo : String;
              threadText : String;
      
  };

  relation : Relation[]; 
      
  category : Category;
  ressourceType : RessourceType[];

}
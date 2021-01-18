import { Users } from "./user.model";
import {Relation} from "./relation.model";

export class Ressource {
  posterId: String;
  message: String;
  picture:  String;
  video:  String;
  likers: [Users];
  comments: [String];
  relation : [Relation];       
  category : String;
  ressourceType : [String];

}
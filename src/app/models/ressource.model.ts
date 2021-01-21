import { Users } from './user.model';
import { Relation } from './relation.model';
import { Category } from './category.model';
import { RessourceType } from './ressourceType.model';

export class Ressource {
  posterId: string;
  posterPseudo: string;
  message: string;
  picture: string;
  video: string;
  likers: [{
    _id: string,
    pseudo: string,
    email: string
  }];
  comments: [
    {
      commenterId: string,
      commenterPseudo: string;
      text: string;
    }
  ];
  relation: [Relation];
  category: Category;
  ressourceType: [RessourceType];

}

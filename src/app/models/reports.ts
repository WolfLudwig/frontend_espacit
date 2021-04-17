import { Ressource } from "./ressource";
import { Account } from "./account";

export class Reports {
  static fromJson(jsonItem: Reports): any {
    throw new Error('Method not implemented.');
  }
  post : Ressource;
  account : Account;

}
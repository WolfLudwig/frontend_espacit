import { Role } from './role';

export class Account {
    id: string;
    pseudo: string;
    title: string;
    firstName: string;
    lastName: string;
    adress: string;
    city: string;
    zipCode: string;
    email: string;
    role: Role;
    jwtToken?: string;

    password: number;
    picture: String;
    bio:  String;
    friend: [String];
    likes:  [String];
}

import { Role } from './role';

export class Account {
    id: string;
    pseudo: string;
    title: string;
    firstName: string;
    lastName: string;
    adress: string;
    city: string;
    status : Boolean;
    zipCode: string;
    email: string;
    role: Role;
    jwtToken?: string;
}

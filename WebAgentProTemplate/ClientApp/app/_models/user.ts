import { Role } from "./role";

export class User {
    userName: string;
    id: string;
    u_FirstName: string;
    u_LastName: string;
    roles: Role[];
    role: number;
    userStatus: number;
    isActive: boolean;
    token: string;
}

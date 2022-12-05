export interface User{
    accessToken:string;
    expDate: string;
    issueAt: string;
    error: {
        code: number;
        description: string;
    };
    refreshToken: string;
}
export interface CurrUser{
    token: string;
    
}

export interface UserRole{
    roles: [
        {
            role:string;
            description: string;
        }
    ],
    error: {
        code: number;
        description: string;
    }
}

export interface NewUser{
    login: string;
    password: string;
    role: string;
}
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
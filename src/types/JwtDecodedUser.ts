export  interface JwtDecodedAdmin {
    
    id: string;
    email: string;
    username: string;
  
}
export interface JwtDecodedUser{
    userId:string;
    email:string;
    username:string
    projectId?:string
}
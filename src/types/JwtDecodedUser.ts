export  interface JwtDecodedAdmin {
    
    id: string;
    email: string;
    username: string;
  
}
export interface JwtDecodedUser{
    id:string;
    email:string;
    projectId:string
}
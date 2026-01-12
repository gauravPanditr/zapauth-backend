export default interface JwtDecodedUser {
    id: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
}
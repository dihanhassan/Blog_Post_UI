export interface  token {
    token: string;
    refreshToken : string;
}

export interface UserLoginResponse extends token{
    firstName: string;
    lastName: string;
    email: string;
}
export interface UserRegisterResponse extends UserLoginResponse{}

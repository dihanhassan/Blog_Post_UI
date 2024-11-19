export namespace userAuthenticateAction {

  export class UserLogin {
    static readonly type = '[UserLogin] User Login';
    constructor(public email: string, public password: string) { }
  }

  export class ClearResult
  {
      static readonly type = '[ClearResult] Clear User data';
      constructor() { }
  }
  export class UpdateTokens {
    static readonly type = '[UserLogin] Update Tokens';
    constructor(public token: string, public refreshToken: string) {}
  }

}
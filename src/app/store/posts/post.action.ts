export namespace postAction {

  export class GetAllPosts {
    static readonly type = '[Post] User Login';
    constructor() { }
  }

  export class ClearResult
  {
      static readonly type = '[ClearResult] Clear User data';
      constructor() { }
  }
}
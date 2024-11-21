export namespace postAction {

  export class GetAllPosts {
    static readonly type = '[Post] Get All Posts';
    constructor() { }
  }
  export class GetPostById {
    static readonly type = '[Post] Get post by id';
    constructor(public id : number) { }
  }

  export class GetPostByCategory {
    static readonly type = '[Post] Get post by category';
    constructor(public id : number) { }
  }
  export class ClearResult
  {
      static readonly type = '[ClearResult] Clear User data';
      constructor() { }
  }
}
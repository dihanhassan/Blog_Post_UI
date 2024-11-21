export namespace postCategoryAction {

  export class GetAllCategory {
    static readonly type = '[Category] User Login';
    constructor() { }
  }

  export class GetAllPostCategory {
    static readonly type = '[Post Category] post category';
    constructor() { }
  }

  export class GetAllPostCategoryByPostId {
    static readonly type = '[Post Category] post category by post id';
    constructor(public postId: number) { }
  }
  export class ClearResult
  {
      static readonly type = '[ClearResult] Clear User data';
      constructor() { }
  }
}
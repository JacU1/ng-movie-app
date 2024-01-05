export class AddMovie {
    static readonly type = '[Movies] Add Movies';
    constructor(public title: string, public poster: string, public id: string) {}
  }
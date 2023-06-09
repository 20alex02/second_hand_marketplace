export class TokenIsNotValid extends Error {
  constructor() {
    super('Token is not valid.');
    this.name = 'TokenIsNotValid';
  }
}

export class WrongPassword extends Error {
  constructor() {
    super('Wrong password');
    this.name = 'WrongPassword';
  }
}

export class MissingRequiredField extends Error {
  public field: string;
  constructor(field: string) {
    super('Required field is missing');
    this.name = 'MissingRequiredField';
    this.field = field;
  }
}

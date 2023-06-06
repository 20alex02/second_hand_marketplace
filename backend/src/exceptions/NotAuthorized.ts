class TokenIsNotValid extends Error {
  constructor() {
    super('Token is not valid.');
    this.name = 'TokenIsNotValid';
  }
}

export default TokenIsNotValid;

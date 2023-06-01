class WrongPassword extends Error {
  constructor() {
    super('Wrong password');
    this.name = 'WrongPassword';
  }
}

export default WrongPassword;

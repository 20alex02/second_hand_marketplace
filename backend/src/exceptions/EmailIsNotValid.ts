class EmailIsNotValid extends Error {
  constructor() {
    super('Email is not valid.');
    this.name = 'EmailIsNotValid';
  }
}

export default EmailIsNotValid;

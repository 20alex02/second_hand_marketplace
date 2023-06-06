class NotValidType extends Error {
  constructor() {
    super('Type is not valid');
    this.name = 'NotValidType';
  }
}

export default NotValidType;

export class ExtensionError extends Error {
  constructor() {
    super('Wrong extension! Only .png, .jpg and .jpeg format allowed.');
    this.name = 'ExtensionError';
  }
}

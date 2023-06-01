class MissingRequiredField extends Error {
  public field: string;
  constructor(field: string) {
    super("Required field is missing");
    this.name = 'MissingRequiredField';
    this.field = field;
  }
}

export default MissingRequiredField;

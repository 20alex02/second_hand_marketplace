export class NonexistentRecordError extends Error {
  constructor(record: string) {
    super(record + 'does not exist');
    this.name = 'NonexistentRecordError';
  }
}

export class DeletedRecordError extends Error {
  constructor(record: string) {
    super(record + 'already deleted');
    this.name = 'DeletedRecordError';
  }
}

export class ConflictingRecordError extends Error {
  constructor(record: string, property: string) {
    super('Conflicting' + property + 'in' + record);
    this.name = 'ConflictingRecordError';
  }
}

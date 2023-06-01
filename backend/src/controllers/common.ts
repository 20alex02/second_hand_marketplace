import type { ApiResponse } from './types';
import MissingRequiredField from '../exceptions/MissingRequiredField';

export const createErrorResponse = (
  reason: string,
  field: string | null = null
): ApiResponse<object> => {
  return {
    status: 'failure',
    error: reason,
    data: { field: field },
  };
};

export const handleMissingField = (
  missingField: string
): ApiResponse<object> => {
  return createErrorResponse('Required field is missing.', missingField);
};

export const getRequiredField = (
  data: { [x: string]: string },
  field: string
) => {
  const curField = data[field];
  if (curField === null || curField === undefined) {
    throw new MissingRequiredField(field);
  }
  return curField;
};

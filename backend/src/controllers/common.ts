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

export const getRequiredField = <T>(
  data: { [x: string]: T },
  field: string
) => {
  const curField = data[field];
  if (curField === null || curField === undefined) {
    throw new MissingRequiredField(field);
  }
  return curField;
};

export const getOptionalField = <T>(
  data: { [x: string]: T | null },
  field: string
) => {
  const curField = data[field];
  if (curField === null || curField === undefined) {
    return null;
  }
  return curField;
};

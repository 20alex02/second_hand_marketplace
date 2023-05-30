import { Result } from '@badrap/result';
import type { ParticipantCreateData } from '../types/data';
import type { ParticipantCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';

const create = async (
  data: ParticipantCreateData,
): ParticipantCreateResult => {
  try {
    const participant = await client.participant.create({
      data: {
        ...data,
      },
    });
    return Result.ok(participant);
  } catch (e) {
    return genericError;
  }
};

export default create;

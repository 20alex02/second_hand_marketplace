import { Result } from '@badrap/result';
import type { ParticipantDeleteData } from '../types/data';
import type { ParticipantDeleteResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { NonexistentRecordError, DeletedRecordError } from '../types/errors';

const deleteParticipant = async (
  data: ParticipantDeleteData
): ParticipantDeleteResult => {
  try {
    return await client.$transaction(async (tx) => {
      const participantCheck = await tx.participant.findUnique({
        where: {
          id: data.id,
        },
      });
      if (participantCheck === null) {
        return Result.err(
          new NonexistentRecordError('participant does not exists')
        );
      }
      if (participantCheck.deletedAt !== null) {
        return Result.err(
          new DeletedRecordError('participant already deleted')
        );
      }
      const participant = await tx.participant.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return Result.ok(participant);
    });
  } catch (e) {
    return genericError;
  }
};

export default deleteParticipant;

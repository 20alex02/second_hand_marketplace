import { Result } from '@badrap/result';
import type { ParticipantUpdateData } from '../types/data';
import type { ParticipantUpdateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const updateParticipant = async (
  data: ParticipantUpdateData
): ParticipantUpdateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const participantCheck = await tx.participant.findUnique({
        where: {
          id: data.id,
        },
      });
      if (participantCheck === null) {
        return Result.err(new NonexistentRecordError('Participant'));
      }
      if (participantCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('Participant'));
      }
      const { id, ...dataToUpdate } = data;
      const participant = await tx.participant.update({
        where: {
          id: id,
        },
        data: dataToUpdate,
      });
      return Result.ok(participant);
    });
  } catch (e) {
    return genericError;
  }
};

export default updateParticipant;

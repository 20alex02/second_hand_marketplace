import { Result } from '@badrap/result';
import type {
  ParticipantReadOneData,
  ParticipantReadAllData,
} from '../types/data';
import type {
  ParticipantReadOneResult,
  ParticipantReadAllResult,
} from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const readOneParticipant = async (
  data: ParticipantReadOneData
): ParticipantReadOneResult => {
  try {
    const participant = await client.participant.findUnique({
      where: {
        id: data.id,
      },
      include: {
        advertisement: true,
        user: true,
      },
    });
    if (participant == null) {
      return Result.err(new NonexistentRecordError('Participant'));
    }
    if (participant.deletedAt != null) {
      return Result.err(new DeletedRecordError('Participant'));
    }
    return Result.ok(participant);
  } catch (e) {
    return genericError;
  }
};

const readAllParticipant = async (
  data: ParticipantReadAllData
): ParticipantReadAllResult => {
  try {
    const participants = await client.participant.findMany({
      where: {
        deletedAt: null,
        ...data,
      },
    });
    return Result.ok(participants);
  } catch (e) {
    return genericError;
  }
};

export default {
  one: readOneParticipant,
  all: readAllParticipant,
};

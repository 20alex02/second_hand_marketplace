import { Result } from '@badrap/result';
import type { ParticipantCreateData } from '../types/data';
import type { ParticipantCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const createParticipant = async (
  data: ParticipantCreateData
): ParticipantCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const { advertisementId, userId, ...createData } = data;
      if (userId !== undefined) {
        const userCheck = await tx.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (userCheck === null) {
          return Result.err(new NonexistentRecordError('User'));
        }
        if (userCheck.deletedAt !== null) {
          return Result.err(new DeletedRecordError('User'));
        }
      }
      const participant = await tx.participant.create({
        data: {
          ...createData,
          advertisement: {
            connect: {
              id: advertisementId,
            },
          },
          user: userId
            ? {
                connect: {
                  id: userId,
                },
              }
            : {},
        },
      });
      return Result.ok(participant);
    });
  } catch (e) {
    return genericError;
  }
};

export default createParticipant;

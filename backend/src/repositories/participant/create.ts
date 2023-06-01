import { Result } from '@badrap/result';
import type { ParticipantCreateData } from '../types/data';
import type { ParticipantCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

const createParticipant = async (
  data: ParticipantCreateData
): ParticipantCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      if ('userId' in data) {
        const userCheck = await tx.user.findUnique({
          where: {
            id: data.userId,
          },
        });
        if (userCheck === null) {
          return Result.err(new NonexistentRecordError('user does not exists'));
        }
        if (userCheck.deletedAt !== null) {
          return Result.err(new DeletedRecordError('user already deleted'));
        }
      }
      const participant = await tx.participant.create({
        data: {
          phoneNumber: data.phoneNumber,
          advertisement: {
            connect: {
              id: data.advertisementId,
            },
          },
          user: data.userId
            ? {
                connect: {
                  id: data.userId,
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

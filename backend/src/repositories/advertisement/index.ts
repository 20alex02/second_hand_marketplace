import createAdvertisement from './create';
import deleteAdvertisement from './delete';
import read from './read';
import updateAdvertisement from './update';

export default {
  create: createAdvertisement,
  delete: deleteAdvertisement,
  read,
  update: updateAdvertisement,
};

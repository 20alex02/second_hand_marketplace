import create from './create';
import deleteAdvertisement from './delete';
import read from './read';
import update from './update';

export default {
  create,
  delete: deleteAdvertisement,
  read,
  update,
};

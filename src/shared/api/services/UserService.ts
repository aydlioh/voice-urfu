import { IUser } from '../../../entities/auth/models';
import { LocalStorageService } from './LocalStorageService';

class UserService extends LocalStorageService<IUser> {
  constructor() {
    super('voice-user-data');
  }
}

export default new UserService();

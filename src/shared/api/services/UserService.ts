import { IUser } from '@/entities/users';
import { LocalStorageService } from './LocalStorageService';

class UserService extends LocalStorageService<IUser> {
  constructor() {
    super('voice-user-data');
  }
}

export default new UserService();

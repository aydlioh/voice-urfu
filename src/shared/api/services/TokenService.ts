import { ISecret } from '@/entities/auth';
import { LocalStorageService } from './LocalStorageService';

class TokenService extends LocalStorageService<ISecret> {
  constructor() {
    super('voice-secret');
  }

  hasToken() {
    return Boolean(this.get());
  }
}

export default new TokenService();

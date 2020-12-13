import { of } from 'rxjs';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

export class PostgresUserRepository implements IUserRepository {
  private users: User[] = [];

  findByEmail(email: string): Promise<User> {
    const user: User = this.users.find((user) => user.email === email);

    return of(user).toPromise();
  }
  save(user: User): void {
    this.users.push(user);
  }
}

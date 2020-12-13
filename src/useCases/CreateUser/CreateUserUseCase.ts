import { IMailProvider } from '../../providers/IMailProvider';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Meu app SOLID',
        email: 'meu_app@solid.com'
      },
      subject: 'Seja bem vinda!',
      body: '<p>Voce já pode fazer login no app</p>'
    });
  }
}

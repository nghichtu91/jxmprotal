import { IUserRepository } from '@/domains/useCases/interfaces/user';

export default interface IRepositories {
  user: IUserRepository;
}

import UserUseCase from '@/domains/useCases/user';
import IRepositories from './interfaces/iRepositories';
import IUseCases from './interfaces/iUseCases';

export default (repositories: IRepositories): IUseCases => {
  return {
    user: new UserUseCase(repositories.user),
  };
};

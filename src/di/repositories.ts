import IRepositories from './interfaces/iRepositories';
import userRepsitory from '../adapters/repositories/user';
import IInfrastructures from './interfaces/iInfrastructures';

export default (infra: IInfrastructures): IRepositories => {
  return {
    user: new userRepsitory(infra.httpClient),
  };
};

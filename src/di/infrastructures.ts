import IInfrastructures from './interfaces/iInfrastructures';
import HttpClient from '../adapters/infra/axios';

export default (): IInfrastructures => {
  return {
    httpClient: new HttpClient(),
  };
};

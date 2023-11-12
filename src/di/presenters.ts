import UserPresenter from '@/adapters/presenters/user';
import IPresenters from './interfaces/iPresenters';
import IUseCases from './interfaces/iUseCases';

export default (useCases: IUseCases): IPresenters => {
  return {
    user: new UserPresenter(useCases.user),
  };
};

import { IPaymentDTO } from './payment.dto';

export type ICreatePaymentDTO = Pick<IPaymentDTO, 'cardPin' | 'cardType' | 'cardSeri' | 'cardValue'>;

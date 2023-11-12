export const SECRET_QUESTIONS = [
  {
    label: 'Tên con vật yêu thích?',
    value: '1',
  },
  {
    label: 'Trường cấp 1 của bạn tên gì?',
    value: '2',
  },
  {
    label: 'Người bạn yêu quý nhất?',
    value: '3',
  },
  {
    label: 'Trò chơi bạn thích nhất?',
    value: '4',
  },
  {
    label: 'Nơi để lại kỉ niệm khó quên nhất?',
    value: '5',
  },
];

export const PHONE_PATTERN = /^(84|0[3|5|7|8|9])[0-9]{8}$/;
export const CURRENCY = '₫';
export const CURRENCY_GAME = 'xu';

export enum StatisticActions {
  'PAYMENT_BY_YEAR' = 'paymentbyyear',
  'PAYMENT_FORM_TO' = 'paymentformto',
  'TOTALS' = 'totals',
}

export type SmsActions =
  | 'phonechange'
  | 'passwordchange'
  | 'secpasschange'
  | 'secretquestionchange'
  | 'unlockequipment'
  | 'forgotpass';

export enum AdminActions {
  'ADD_XU' = 'addxu',
  'RESET_ACCOUNT' = 'resetaccount',
  'PAYMENT_HISTORIES' = 'paymenthistory',
}

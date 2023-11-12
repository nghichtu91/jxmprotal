export interface IPaymentEntity {
  id: string;
  value: number;
  coin: number;
  comment: string;
  status: number;
  gateway: string;

  seri?: string;
  pin?: string;
  cardType?: string;
  declared_value?: number;
}

export interface IPaymentData {
  status?: number;
  id?: string;
  userName?: string;
  coin?: number;
  gateway?: string;
  cardType?: string;
  cardSeri?: string;
  cardPin?: string;
  cardValue?: number;
  transaction?: string;
  transactionId?: string;
  transactionCode?: string;
  comment?: string;
}

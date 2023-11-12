export interface IPaymentDTO {
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

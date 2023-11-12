import dayjs from 'dayjs';
import { IPaymentData, IPaymentEntity } from './interfaces/IPayment';

export class PaymentEntity implements IPaymentEntity {
  private readonly _id: string;
  private readonly _value: number;
  private readonly _coin: number;
  private readonly _comment: string;
  private readonly _status: number;
  private readonly _gateway: string;
  private readonly _seri?: string;
  private readonly _pin?: string;
  private readonly _cardType?: string;
  private readonly _userName?: string;
  private readonly _createdAt?: string;

  constructor(params: IPaymentData) {
    this._coin = params.coin || 0;
    this._comment = params.comment || '';
    this._value = params.cardValue || 0;
    this._gateway = params.gateway || 'Chưa xác định';
    this._status = params.status || 99;
    this._id = params.id || '';
    this._seri = params.cardSeri || '';
    this._pin = params.cardPin || '';
    this._cardType = params.cardType || '';
    this._userName = params.userName;
    this._createdAt = params.createdAt ? dayjs(params.createdAt).format('DD/MM/YYYY HH:mm') : undefined;
  }

  get createdAt() {
    return this._createdAt;
  }

  get userName() {
    return this._userName;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  get coin() {
    return this._coin;
  }

  get comment() {
    return this._comment;
  }

  get status() {
    return this._status;
  }

  get gateway() {
    return this._gateway;
  }

  get seri() {
    return this._seri;
  }
  get cardType() {
    return this._cardType;
  }
  get pin() {
    return this._pin;
  }
}

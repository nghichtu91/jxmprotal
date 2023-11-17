import dayjs from 'dayjs';
import { IGiftCode, IGiftCodeData } from './interfaces/IGiftcode';

export class GiftCodeEntity implements IGiftCode {
  private readonly _ID: number;
  private readonly _ServerID: number;
  private readonly _Code: string;
  private readonly _Status: number;
  private readonly _ItemList: string;
  private readonly _TimeCreate: Date;
  private readonly _CodeType?: string;
  private readonly _MaxActive: number;
  private readonly _UserName?: string;
  constructor(giftcodedata: IGiftCodeData) {
    this._ID = giftcodedata.ID;
    this._ServerID = giftcodedata.ServerID;
    this._Code = giftcodedata.Code;
    this._Status = giftcodedata.Status || 0;
    this._ItemList = giftcodedata.ItemList;
    this._CodeType = giftcodedata.CodeType;
    this._MaxActive = giftcodedata.MaxActive || 0;
    this._UserName = giftcodedata.UserName;
    this._TimeCreate = dayjs().toDate();
  }

  get ServerID() {
    return this._ServerID;
  }

  get Code() {
    return this._Code;
  }

  get Status() {
    return this._Status;
  }

  get ItemList() {
    return this._ItemList;
  }

  get TimeCreate() {
    return this._TimeCreate;
  }

  get CodeType() {
    return this._CodeType;
  }

  get MaxActive() {
    return this._MaxActive;
  }

  get UserName() {
    return this._UserName;
  }

  get ID() {
    return this._ID;
  }
}

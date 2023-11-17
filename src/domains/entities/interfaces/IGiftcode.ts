export interface IGiftCode {
  ID: number;
  ServerID: number;
  Code: string;
  Status?: number;
  ItemList: string;
  TimeCreate?: Date;
  CodeType?: string;
  MaxActive?: number;
  UserName?: string;
}

export interface IGiftCodeData {
  ID: number;
  ServerID: number;
  Code: string;
  Status?: number;
  ItemList: string;
  TimeCreate?: Date;
  CodeType?: string;
  MaxActive?: number;
  UserName?: string;
}

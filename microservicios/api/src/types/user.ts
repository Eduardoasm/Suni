export interface IMetamap {
  id?: string;
  user_id?: string;
  status?: string;
  dni_firstName?: string;
  dni_lastName?: string;
  dni_type?: string;
  dni_value?: string;
  country?: string;
}

export interface IUserAuth {
  _id?: string;
  id: string;
  email: string;
  name: string;
  lastname: string;
  metamapStatus?: IMetamap;
}

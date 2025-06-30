export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
}

export interface IResponse {
  status?: number;
  success?: boolean;
  message?: string;
  data?: object;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAddress {
  id?: number;
  street: string;
  number: string;
  cep: string;
  city: string;
  complement: string;
}

export interface Authorities {
  authority: string;
}

export interface AuthenticatedUser {
  displayName: string;
  username: string;
  authorities: Authorities[];
}

export interface AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IBrand {
  id?: number;
  name: string;
}

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  img: string;
  img2: string;
  img3: string;
  conection_type: string;
  size: string;
  category: ICategory;
  brand: IBrand;
}

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface IItemSale {
  quantity: number;
  product: IProduct;
}

export interface ISale {
  id?: number;
  saleDate: string;
  total: number;
  payment_method:
    | "CARTAO_CREDITO"
    | "CARTAO_DEBITO"
    | "BOLETO"
    | "PIX"
    | "BITCOIN"
    | "ETHEREUM";
  address: IAddress;
  saleItems: IItemSale[];
}

export type IFrete = number;

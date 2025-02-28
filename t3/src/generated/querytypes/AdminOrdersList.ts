import type { RecordId } from "surrealdb";
export type AdminOrdersList = [
  AdminOrdersListquery1[]
]
type AdminOrdersListquery1 = {
  checked: boolean;
  created_at: Date;
  delivered: boolean;
  done: boolean;
  id: RecordId;
  orderid: string;
  packed: boolean;
  paid: boolean;
  payment: Payment;
  shipped: boolean;
  trackingnumber: string;
  user: User;
  userrecieved: boolean;
  waybill?: string;
}
type User = {
  _id: string;
  cart: (Cart | Cart2 | Cart3 | Cart4 | Cart5 | Cart6 | Cart7)[];
  created: Created;
  info: Info;
  ip: string;
  ipLoc: IpLoc | null;
  lastSeen: Created;
  userAgent: string;
  uuid: string;
  admin?: boolean;
  cartTotal?: number;
  shipping?: number;
}
type IpLoc = {
  city: string;
  country: string;
  eu: string;
  ll: number[];
  metro: number;
  range: number[];
  region: string;
  timezone: string;
}
type Info = {
  address1: string;
  address2: string;
  address3: string;
  email: string;
  firstName: string;
  lastName: string;
  postcode: string;
  telephone: string;
}
type Created = {
  jsonTime: string;
  unix: number;
}
type Cart7 = {
  cartItemUuid: string;
  package: string;
}
type Cart6 = {
  addedtime: string;
  car?: Car;
  cartItemUuid: string;
  package?: string;
  paint?: Paint3;
  price: number;
}
type Cart5 = {
  addedtime: string;
  car: Car;
  cartItemUuid: string;
  package: string;
  paint: Paint;
  price: number;
}
type Cart4 = {
  addedtime: string;
  car: Car;
  cartItemUuid: string;
  package: string;
  paint: Paint3;
  price: number;
}
type Paint3 = {
  code: string;
  color: string;
  desc: string;
}
type Cart3 = {
  addedtime: string;
  car: Car;
  cartItemUuid: string;
  package: string;
  paint: Paint2;
  price: number;
}
type Paint2 = {
  code: string;
  color: string;
  desc: string;
  href?: string;
}
type Cart2 = {
  addedtime: string;
  cartItemUuid: string;
  price: number;
  car?: Car;
  package?: string;
  paint?: Paint;
}
type Paint = {
  code: string;
  color: string;
  desc: string;
  href: string;
}
type Car = {
  brandName: string;
  modelName: string;
}
type Cart = {
  addedtime: string;
  cartItemUuid: string;
  price: number;
}
type Payment = {
  amount_fee: string;
  amount_gross: string;
  amount_net: string;
  custom_int1: string;
  custom_int2: string;
  custom_int3: string;
  custom_int4: string;
  custom_int5: string;
  custom_str1: string;
  custom_str2: string;
  custom_str3: string;
  custom_str4: string;
  custom_str5: string;
  email_address: string;
  item_description: string;
  item_name: string;
  m_payment_id: string;
  merchant_id: string;
  name_first: string;
  name_last: string;
  payment_status: string;
  pf_payment_id: string;
  signature: string;
}
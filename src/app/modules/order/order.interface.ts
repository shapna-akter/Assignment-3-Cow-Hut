import { Types } from 'mongoose';

export type IOrder = {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
};

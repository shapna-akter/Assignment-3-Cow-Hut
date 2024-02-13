import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import Order from './order.model';
import Cow from '../cow/cow.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const createOrder = async (orderData: IOrder): Promise<IOrder | null> => {
  const { cow, buyer } = orderData;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cowData = await Cow.findById(cow);
    const sellerId = cowData?.seller?.toString();
    const sellerData = await User.findById(sellerId);
    const buyerData = await User.findById(buyer);

    if (sellerData && buyerData) {
      if (
        cowData &&
        cowData.price !== undefined &&
        buyerData.budget >= cowData?.price
      ) {
        sellerData.income = cowData?.price;
        buyerData.budget = buyerData?.budget - cowData?.price;
        if (cowData.label === 'sold out') {
          throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Cow is sold out');
        } else {
          cowData.label = 'sold out';
        }
      } else {
        throw new ApiError(
          httpStatus.EXPECTATION_FAILED,
          'Budget is not enough'
        );
      }
    } else {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Data is not found');
    }

    await sellerData?.save();
    await buyerData?.save();
    await cowData?.save();

    const createdOrder = Order.create(orderData);

    if (!createdOrder) {
      throw new ApiError(
        httpStatus.EXPECTATION_FAILED,
        'failed to create Order'
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return createdOrder;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllOrders = async (): Promise<IOrder[] | null> => {
  const allOrders = Order.find();

  if (!allOrders) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'failed to get all Users'
    );
  }

  return allOrders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};

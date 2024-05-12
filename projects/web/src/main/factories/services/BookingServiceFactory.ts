import BookingService from '@/infra/services/BookingService';
import { makeBookingGateway } from '@/main/factories/gateways/BookingGatewayFactory';

export const makeBookingService = () => {
  return new BookingService(makeBookingGateway());
};

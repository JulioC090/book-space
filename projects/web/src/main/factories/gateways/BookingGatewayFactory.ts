import BookingGateway from '@/infra/gateways/BookingGateway';
import { axiosHttpClient } from '@/main/factories/http/AxiosHttpClientFactory';

export const makeBookingGateway = () => {
  return new BookingGateway(axiosHttpClient);
};

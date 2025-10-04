import api from './api';

interface CreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

const createCheckoutSession = (data: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse> => {
  return api.post('/payments/create-checkout-session', data).then(response => response.data);
};

const paymentService = {
  createCheckoutSession,
};

export default paymentService;
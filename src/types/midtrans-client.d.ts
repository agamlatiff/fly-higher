declare module 'midtrans-client' {
  interface SnapConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface CoreApiConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionParameter {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    customer_details?: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
    };
    item_details?: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
    callbacks?: {
      finish?: string;
      error?: string;
      pending?: string;
    };
  }

  interface TransactionResult {
    token: string;
    redirect_url: string;
  }

  class Snap {
    constructor(config: SnapConfig);
    createTransaction(parameter: TransactionParameter): Promise<TransactionResult>;
  }

  class CoreApi {
    constructor(config: CoreApiConfig);
    transaction: {
      status(orderId: string): Promise<unknown>;
      notification(notificationJson: unknown): Promise<unknown>;
    };
  }

  export { Snap, CoreApi };
  const midtransClient = { Snap, CoreApi };
  export default midtransClient;
}

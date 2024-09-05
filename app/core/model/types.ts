// structure of a Category
export interface Category {
  external_id: string;
  name: string;
}

// structure of a Store
export interface Store {
  external_id: string;
  slug: string;
  name: string;
  address: string;
  photo: string | null;
}

// structure of a Merchant
export interface Merchant {
  slug: string;
  name: string;
  logo: string;
  categories: Category[];
  description: string;
  website: string;
  highlighted_products: any[];
  min_in_store_checkout_order_grand_total: string;
  stores: Store[];
}

// structure of the Merchant response data
export interface MerchantResponse {
  success: boolean;
  data: {
    merchants: Merchant[];
  };
  message: string | null;
  errors: string | null;
}

// structure of the Auth response data for login
export interface LoginResponse {
  success: boolean;
  data: {
    session_id: string;
  };
  message: string | null;
  errors: string | null;
}

// structure of the Auth response data for OTP confirmation
export interface OtpResponse {
  success: boolean;
  data: {
    token: string;
  };
  message: string | null;
  errors: string | null;
}

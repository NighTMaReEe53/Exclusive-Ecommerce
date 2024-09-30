export interface IRegister {
  label: string;
  type: string;
  name: "username" | "password" | "email";
}

export interface IProduct {
  attributes: {
    title: string;
    description: string;
    price: number;
    sale: boolean;
    stock: number;
    type: string;
    rate: number;
    have_stock: boolean;
    qty: number;
    image_product: {
      data: [
        {
          attributes: {
            url: string;
          };
        },
        {
          attributes: {
            url: string;
          };
        },
        {
          attributes: {
            url: string;
          };
        }
      ];
    };
    categories: {
      data: [
        {
          attributes: {
            category: string;
          };
        }
      ];
    };
  };
  id: number;
}

export interface ILogin {
  label: string;
  type: string;
  name: "password" | "identifier";
}

export interface IError {
  error: {
    message: string;
  };
}

export interface ICategory {
  id: number;
  attributes: {
    category: string;
    image_category: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
}

export interface ICollection {
  id: number;
  attributes: {
    id_product_custom: number;
    new_qty: number;
    products: {
      data: IProduct[];
    };
  };
}
export interface ICollectionTesting {
  id?: number;
  id_product_custom: number;
  new_qty: number;
  products: [
    {
      id?: number;
      title: string;
      description: string;
      price: number;
      sale: boolean;
      stock: number;
      type: string;
      rate: number;
      have_stock: boolean;
      qty: number;
      image_product: [
        {
          url: string;
        },
        {
          url: string;
        }
      ];
    }
  ];
}

export interface IOrder {
  id?: number;
  city: string;
  phone: string;
  street?: string;
  createdAt: string;
  products: ICollectionTesting[];
}

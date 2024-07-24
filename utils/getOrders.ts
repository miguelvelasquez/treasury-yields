export type OrdersResponseType = {
  _id: string;
  date: string;
  maturity: string;
  interestRate: number;
};

type GetOrdersType = (userId: string) => Promise<OrdersResponseType[]>;

export const getOrders: GetOrdersType = async (userId) => {
  const response = await fetch(`/api/orders/${userId}`, {
    method: "GET",
  });
  const user = await response.json();

  return user?.orders;
};

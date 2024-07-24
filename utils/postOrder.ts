import { InterestRate } from "./getTreasuryData";

export type OrderResponseType = { username: string; _id: string };

type PostOrderType = (
  userId: string,
  order: InterestRate
) => Promise<OrderResponseType | null>;

export const postOrder: PostOrderType = async (userId, order) => {
  const response = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({ userId, date: new Date().toDateString(), ...order }),
  });
  return await response.json();
};

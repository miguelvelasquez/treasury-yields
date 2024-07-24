import { useEffect, useState } from "react";
import { OrdersResponseType, getOrders } from "../utils/getOrders";
import { useAuth } from "../AuthContext";

const OrdersTable = () => {
  const { authUserId } = useAuth();
  const [orders, setOrders] = useState<OrdersResponseType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersResult = await getOrders(authUserId);
      setOrders(ordersResult);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <table
        style={{
          textAlign: "left",
        }}
      >
        <tr>
          <th>Date</th>
          <th>Maturity</th>
          <th>Interest Rate</th>
        </tr>
        {orders.map((order) => {
          return (
            <tr key={order._id}>
              <td>{order.date}</td>
              <td>{order.maturity}</td>
              <td>{order.interestRate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default OrdersTable;

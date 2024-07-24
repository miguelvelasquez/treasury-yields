import { useAuth } from "../AuthContext";
import { InterestRate } from "../utils/getTreasuryData";
import { postOrder } from "../utils/postOrder";
import Button from "./Button";

type OrderFormProps = {
  order?: InterestRate;
  clearOrder: () => void;
};

const OrderForm = ({ order, clearOrder }: OrderFormProps) => {
  const { authUserId } = useAuth();
  const handleOrder = () => {
    if (order) {
      postOrder(authUserId, order);
      clearOrder();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: 20 }}>
        <h4>Maturity</h4>
        <h5>{order?.maturity ?? " "}</h5>
      </div>
      <div style={{ marginRight: 20 }}>
        <h4>Interest Rate</h4>

        <h5>{order?.interestRate ?? " "}</h5>
      </div>
      <Button
        label="Place Order"
        onClick={handleOrder}
        disabled={order == undefined}
      />
    </div>
  );
};
export default OrderForm;

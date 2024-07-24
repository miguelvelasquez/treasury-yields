import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { InterestRate } from "../utils/getTreasuryData";

type ChartProps = {
  interestRates: InterestRate[];
};

const Chart = ({ interestRates }: ChartProps) => {
  return (
    <div className="container">
      <ResponsiveContainer aspect={1} minWidth={400}>
        <LineChart
          data={interestRates}
          margin={{ top: 50, right: 50, bottom: 50 }}
        >
          <Line type="monotone" dataKey="yield" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="maturity" domain={[0, 30]} interval={0} />
          <YAxis domain={["auto", "auto"]} padding={{ bottom: 20 }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <style jsx>{`
        .container {
          padding: 20;
          border: 2px solid black;
          border-radius: 50px;
          display: "flex";
          justify-content: "center";
          aspect-ratio: 1;
          width: 70vw;
          min-width: 400px;
          min-height: 400px;
          max-width: 650px;
        }
      `}</style>
    </div>
  );
};

export default Chart;

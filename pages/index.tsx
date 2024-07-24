import Head from "next/head";
import client from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { TreasuryData, getTreasuryData } from "../utils/getTreasuryData";
import Chart from "../components/Chart";
import Header from "../components/Header";
import { useAuth } from "../AuthContext";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [treasuryData, setTreasuryData] = useState<TreasuryData>();

  useEffect(() => {
    const getInterestRates = async () => {
      const data = await getTreasuryData();
      setTreasuryData(data);
    };
    getInterestRates();
  }, []);

  const { authUserId, isLoggedIn } = useAuth();
  const chartTitle = `Interest Rates for ${treasuryData?.date.toLocaleDateString()}`;

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <Head>
        <title>Treasury Yields</title>
      </Head>
      <h1>Treasury Yields</h1>

      <main>
        <div className="chart-container">
          <h4>{chartTitle}</h4>
          {treasuryData && <Chart interestRates={treasuryData.interestRates} />}
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/miguelvelasquez/treasury-yields"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to source code{" "}
          <img src="/github.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .chart-container {
          flex: 2;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 80px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

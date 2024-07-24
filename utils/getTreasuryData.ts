export type InterestRate = {
  maturity: string;
  interestRate: number;
};

export type TreasuryData = {
  date: Date;
  interestRates: InterestRate[];
};

export const getTreasuryData = async (): Promise<TreasuryData> => {
  const response = await fetch(
    "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202407",
    {
      mode: "cors",
      method: "GET",
      headers: new Headers({
        Accept: "application/xml",
        "content-type": "application/x-www-form-urlencoded",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const body = response.body;
  const data = await new Response(body).text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "application/xml");

  const entries = xmlDoc.getElementsByTagName("entry");
  const currentRates = entries[entries.length - 1];
  const properties =
    currentRates.getElementsByTagName("m:properties")[0].children;
  const interestRates: InterestRate[] = [];

  for (let i = 1; i < properties.length - 1; i++) {
    interestRates.push(getInterestRateFromProperty(properties[i]));
  }

  return {
    date: new Date(properties[0].textContent ?? ""),
    interestRates,
  };
};

const getInterestRateFromProperty = (property: Element): InterestRate => {
  const term = property.localName.split("_")[1];
  const maturity = ["M", "Y"].includes(term[1])
    ? term.slice(0, 2)
    : term.slice(0, 3);
  return {
    maturity,
    interestRate: parseFloat(property.textContent ?? ""),
  };
};

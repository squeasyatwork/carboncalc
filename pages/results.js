import React, { useState, useEffect } from "react";
import "@app/globals.css";
import styles from "../app/Result.module.css";
import { useRouter } from "next/router";
import BarChart from "@components/BarChart/BarChart";
import PieChart from "@components/PieChart/PieChart";
import { PrismaClient } from "@prisma/client";

export const config = {
  runtime: "nodejs", // or "edge"
};

export const getServerSideProps = async (context) => {
  // console.log("VALUE INSIDE BACKEND context: " + context.query.postcode);

  let postcodeVal = parseInt(context.query.postcode);

  const prisma = new PrismaClient();
  const getSuburb = await prisma.energy_usage.findFirst({
    where: {
      postcode: postcodeVal,
    },
  });

  const dbResponse = JSON.parse(JSON.stringify(getSuburb));

  console.log("VALUE INSIDE BACKEND dbResponse: " + JSON.stringify(dbResponse));

  return { props: { dbResponse } };
};

export default function Result({ dbResponse }) {
  const [data, setData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPieChart, setShowPieChart] = useState(true);
  const [buttonValue, setButtonValue] = useState("Compare");

  const router = useRouter();
  const {
    query: {
      question1,
      question2,
      question3,
      numOfPeople,
      electricity,
      gas,
      postcode,
    },
  } = router;

  const props = {
    question1,
    question2,
    question3,
    numOfPeople,
    electricity,
    gas,
    postcode,
  };

  console.log(
    "GAS VALUE INSIDE BROWSER dbResponse: " +
      (parseInt(dbResponse.gas_usage) * 55.7) / 1000
  );

  let {
    energy_emissions = -1,
    diet_emissions = -1,
    transp_emissions = -1,
    recycle_emissions = -1,
  } = [-1, -1, -1, -1];

  let electricity_emissions = 1.35 * parseFloat(electricity);
  let gas_emissions = (55.7 / 1000) * parseFloat(gas);
  energy_emissions = electricity_emissions + gas_emissions;
  // console.log(energy_emissions);

  if (question1 == "Vegan") diet_emissions = parseFloat(numOfPeople) * 88.21;
  else if (question1 == "Meat-eating")
    diet_emissions = parseInt(numOfPeople) * 219;
  else if (question1 == "Vegetarian")
    diet_emissions = parseInt(numOfPeople) * 115.58;

  if (question2 == "Own motor vehicle")
    transp_emissions = parseInt(numOfPeople) * 251.93;
  else if (question2 == "Public transport")
    transp_emissions = parseInt(numOfPeople) * 16.26;
  else if (question2 == "Use bicycle or walk")
    transp_emissions = parseInt(numOfPeople) * 0;

  if (question3 == "Yes") recycle_emissions = parseInt(numOfPeople) * -61;
  else if (question3 == "No") recycle_emissions = parseInt(numOfPeople) * 0;

  let household_emissions =
    energy_emissions + diet_emissions + transp_emissions + recycle_emissions;

  let activitiesArr = [
    gas_emissions,
    electricity_emissions,
    transp_emissions,
    diet_emissions,
  ];

  console.log(household_emissions);

  const handleRepeat = async () => {
    router.push("/home");
  };

  const tipCategories = [
    {
      category: "Gas",
      content: (
        <div className={styles.tip_content}>
          <li>
            If you are able, electrification is one of the most effective ways
            of reducing emissions. This is the process of removing gas
            appliances and installing electrical ones.
          </li>
          <li>
            Heating is one of the largest contributors to gas usage. Try
            reducing the amount of time you spend with gas heating on, and opt
            instead to wear warmer clothes. To make heating more efficient, try
            to section off areas of the house that you want warmed, cover
            windows, and block draughts.
          </li>
          <li>
            If you have a gas stove, try using the oven or electrical appliances
            such as air fryers more.
          </li>
          <li>
            If your heating is provided by a gas hot water system, try reducing
            your hot water consumption by doing things like taking shorter
            showers, and lowering your hot water temperature setting.
          </li>
          <li>
            <a href="https://www.energynetworks.com.au/news/energy-insider/how-can-we-use-gas-without-the-emissions/">
              https://www.energynetworks.com.au/news/energy-insider/how-can-we-use-gas-without-the-emissions/
            </a>
          </li>
          <li>
            <a href="https://www.globirdenergy.com.au/9-simple-tips-to-keep-your-gas-bill-down/">
              https://www.globirdenergy.com.au/9-simple-tips-to-keep-your-gas-bill-down/
            </a>
          </li>
        </div>
      ),
      percentage: parseInt(100 * (gas_emissions / household_emissions)),
    },
    {
      category: "Electricity",
      content: (
        <div className={styles.tip_content}>
          <li>
            Switch off lights and electrical appliances when they are not in
            use.
          </li>
          <li>
            Check the energy rating of your appliances and convert to more
            energy-efficient appliances.
          </li>
          <li>
            Optimise the use of appliances, such as setting the temperature of
            your fridge to 4 or 5 degrees Celsius and temperature of the freezer
            to -15 to -18 degrees, and only running your dishwasher when it is
            full.
          </li>{" "}
          <li>
            Every degree above 20 degrees in heating can add 10% to your heating
            bill. In winter, set your thermostat to between 18 and 20 degrees.
            In summer, set your thermostat to 26 degrees or above.
          </li>
          <li>
            <a href="https://www.energy.vic.gov.au/for-households/save-energy-and-money/top-10-energy-saving-tips">
              https://www.energy.vic.gov.au/for-households/save-energy-and-money/top-10-energy-saving-tips
            </a>
          </li>
          <li>
            <a href="https://www.energyrating.gov.au/consumer-information/understand-energy-rating-label">
              https://www.energyrating.gov.au/consumer-information/understand-energy-rating-label
            </a>
          </li>
        </div>
      ),
      percentage: parseInt(100 * (electricity_emissions / household_emissions)),
    },
    {
      category: "Diet",
      content: (
        <div className={styles.tip_content}>
          <li>
            One easy way to reduce your consumption of high impact animal-based
            products is to reduce your portion sizes.
          </li>{" "}
          <li>
            To cut back on meat portions even further, try mixing higher
            emission-impact proteins like beef with low emission-impact
            proteins, for example by adding beans to stews or soups and halving
            the meat content. This is also a great way to save money, as legumes
            like beans are cheap to buy in comparison to meat.
          </li>
          <li>
            If you still want to eat meat, try consuming more fish, chicken and
            pork, as they create less emissions than other livestock such as
            beef or mutton.
          </li>
          <li>
            Use tools like the Sustainable Seafood Guide from GoodFish to help
            make better and more sustainable decisions about what seafood to
            purchase.
          </li>
          <li>
            <a href="https://energysavingtrust.org.uk/how-eating-less-meat-can-reduce-our-carbon-emissions/#:~:text=To%20cut%20back%20on%20meat,buy%20in%20comparison%20to%20meat.">
              https://energysavingtrust.org.uk/how-eating-less-meat-can-reduce-our-carbon-emissions/#:~:text=To%20cut%20back%20on%20meat,buy%20in%20comparison%20to%20meat.
            </a>
          </li>
          <li>
            <a href="https://ourworldindata.org/food-choice-vs-eating-local">
              https://ourworldindata.org/food-choice-vs-eating-local
            </a>
          </li>
          <li>
            <a href="https://goodfish.org.au/sustainable-seafood-guide/">
              https://goodfish.org.au/sustainable-seafood-guide/
            </a>
          </li>
        </div>
      ),
      percentage: parseInt(100 * (diet_emissions / household_emissions)),
    },
    {
      category: "Transport",
      content: (
        <div className={styles.tip_content}>
          <li>
            The easiest way to reduce emissions from travel is to use public
            transport such as trains, buses, trams and ferries, where possible.
          </li>
          <li>
            Minimise your vehicle use, such as performing several errands in one
            trip, avoiding peak-hour traffic and carpooling when possible.
          </li>
          <li>
            Try walking or cycling to your nearest shops, rather than driving.
          </li>
          <li>
            Consider purchasing an electric vehicle when buying your next car.
          </li>
          <li>
            <a href="https://www.greenvehicleguide.gov.au/pages/UnderstandingEmissions/TipsToReduceYourEmissions">
              https://www.greenvehicleguide.gov.au
            </a>
          </li>
          <li>
            <a href="https://www.dcceew.gov.au/energy/transport">
              https://www.dcceew.gov.au/energy/transport
            </a>
          </li>
        </div>
      ),
      percentage: parseInt(100 * (transp_emissions / household_emissions)),
    },
    {
      category: "Recycle",
      content: (
        <div className={styles.tip_content}>
          <li>
            Recycle where you can, try adding a recycling bin inside to make it
            easier.
          </li>
          <li>
            Understand what goes into each bin and how to di7spose and recycle.
          </li>
          <li>
            Recycling bin: Food and drink containers should be emptied and
            rinsed, check that you are only recycling plastics 1 through 5, do
            not bag recyclables.{" "}
          </li>{" "}
          <li>
            General waste: Always use the rubbish bin if you are not sure what
            bin to use, do not put electrical waste or batteries in the bin, and
            bag rubbish.{" "}
          </li>
          <li>
            Green waste: Put all food leftovers (including meat, fish and
            seafood, bones, coffee grounds, paper towels etc.), garden organics
            and fruits and vegetables in this bin.{" "}
          </li>
          <li>
            <a href="https://www.casey.vic.gov.au/rubbish-recycling-food-waste">
              Click here to open the City of Casey Recycling and Waste Guide
            </a>
            .
          </li>
        </div>
      ),
      percentage: parseInt(100 * (recycle_emissions / household_emissions)),
    },
  ];

  tipCategories.sort((a, b) => b.percentage - a.percentage);

  // Check for negative values and calculate normalisationFactor factor
  let positivePercentageSum = 0;
  for (let tip of tipCategories) {
    tip.percentage = Math.max(0, tip.percentage);
    positivePercentageSum += tip.percentage;
  }

  let scaleFactor = 100 / positivePercentageSum;

  for (let tip of tipCategories) {
    if (tip.percentage > 0) {
      tip.displayPercentage = Math.round(tip.percentage * scaleFactor); // Create a new variable for the scaled percentage
    } else {
      tip.displayPercentage = 0; // Ensure the display percentage is zero if the original percentage is negative or zero
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>CARBON CALC</h1>
      </div>
      <div className={styles.intro_text_container}>
        Congratulations on taking the first step towards a more sustainable
        lifestyle. Your carbon footprint is now unveiled, providing a clear
        snapshot of your environmental impact.
      </div>
      <br></br>
      <br></br>
      <div className={styles.chart_container}>
        <div className={styles.introduction_text}>
          <p className={styles.bingo_line}>Your carbonfootprint is: </p>
          <center>
            <p>{data.result}</p>
            <p className={styles.highlighted_text}>
              {parseInt(household_emissions)} kgCO<sub>2</sub>
            </p>
          </center>
        </div>
        <br></br>
        <br></br>
        <br></br>
        {showPieChart ? (
          <>
            <div className={styles.text_container}>
              Composition of your carbonfootprint
            </div>
            <PieChart dset={activitiesArr} />
            <br></br>
            <div className={styles.outer_text_container}>
              <div className={styles.text_container}>
                Tips to reduce your footprint
              </div>
              <br></br>
              <div className={styles.scroll_container}>
                <div className={styles.tip_text_container}>
                  {tipCategories.map((tip, index) => (
                    <div key={index}>
                      <div className={styles.tip_category}>
                        {tip.category} ~ {tip.displayPercentage}%
                      </div>
                      {tip.content}
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <br></br>
              <br></br>
              <div className={styles.text_container}>
                Compare your carbon emisions with your neighbours!
              </div>
              <p>
                The below graph displays your monthly emissions by gas and
                electricity compared to your suburb's and the Victorian average.
                Your suburb is identified by your postcode.
              </p>
              <br></br>
              <BarChart
                electricityValues={[
                  (parseInt(dbResponse.electricity_usage) * 1.35) / 12,
                  parseInt(electricity_emissions),
                  (4684 * 1.35) / 12,
                ]}
                gasValues={[
                  parseInt(dbResponse.gas_usage) * 55.7,
                  parseInt(gas_emissions) * 12,
                  49.8 * 55.7,
                ]}
              />
            </div>
          </>
        )}
        <div className={styles.button_container}>
          <button
            className={styles.button}
            onClick={() => {
              setShowPieChart(!showPieChart);
              setButtonValue("Results");
            }}
          >
            {buttonValue}
          </button>
          <button className={styles.button} onClick={handleRepeat}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import "@app/globals.css";
import styles from "../app/Home.module.css";
import { useRouter } from "next/router";
import Router from "next/router";

export default function Home() {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [electricity, setElectricity] = useState("");
  const [gas, setGas] = useState("");
  const [postcode, setPostcode] = useState("");
  const [inputcheck, setInputcheck] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (question1.trim() === "" || question2.trim() === "" || question3.trim() === "") {
        setInputcheck("Please answer all questions!");
        return;
      }
      setInputcheck("");
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (
        numOfPeople.trim() === "" ||
        electricity.trim() === "" ||
        gas.trim() === "" ||
        postcode.trim() === ""
      ) {
        setInputcheck("Please fill in all the fields!");
        return;
      } else if (
        isNaN(numOfPeople) ||
        isNaN(electricity) ||
        isNaN(gas) ||
        isNaN(postcode) ||
        parseFloat(numOfPeople) < 0 ||
        parseFloat(electricity) < 0 ||
        parseFloat(gas) < 0 ||
        parseFloat(postcode) < 3000 ||
        parseFloat(postcode) > 3999 ||
        !Number.isInteger(parseFloat(numOfPeople)) ||
        !Number.isInteger(parseFloat(postcode))
      ) {
        setInputcheck("check your input!");
        return;
      }
      setInputcheck("");
      sendInput();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };
  
  
  function sendInput() {
    Router.push({
      pathname: "/results",
      query: {
        question1,
        question2,
        question3,
        numOfPeople,
        electricity,
        gas,
        postcode,
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>CARBON CALC</h1>
      </div>
      <div className={styles.text_container}>
        This is a platform where you can effortlessly calculate your carbon
        footprint. But that's not all, we go beyond numbers. Compare your
        footprint with neighbors in your suburb, gaining insights that drive
        collective change. Elevate your eco-journey with personalised
        sustainability tips, custom-fit to your lifestyle. Let's shape a greener
        future together, one footprint at a time.
      </div>
      <div className={styles.introduction}>
        Answer these simple questions and calculate your carbon footprint today!
      </div>
      <div className={styles.content_container}>
        <div className={styles.center}>
          <div className={styles.question_container}>
            {currentStep === 1 && (
              <><div className={styles.question_text}>
                1. What is your household's diet?*
              </div><div className={styles.multiple_selection} style={{marginBottom: "3.8rem"}}>
                  <label>
                    <select
                      className={styles.dropdown_list}
                      value={question1}
                      onChange={(e) => setQuestion1(e.target.value)}
                    >
                      <option className={styles.option} value="">
                        Select an option
                      </option>
                      <option className={styles.option} value="Meat-eating">
                        Meat-eating
                      </option>
                      <option className={styles.option} value="Vegetarian">
                        Vegetarian
                      </option>
                      <option className={styles.option} value="Vegan">
                        Vegan
                      </option>
                    </select>
                  </label>
                </div>
            <div className={styles.question_container}>
              <div className={styles.question_text}>
                2. What is your primary method of transport?*
              </div>
              <div className={styles.multiple_selection}>
                <label>
                  <select
                    className={styles.dropdown_list}
                    value={question2}
                    onChange={(e) => setQuestion2(e.target.value)}
                  >
                    <option className={styles.option} value="">
                      Select an option
                    </option>
                    <option className={styles.option} value="Use bicycle or walk">
                      Use bicycle or walk
                    </option>
                    <option className={styles.option} value="Own motor vehicle">
                      Own motor vehicle
                    </option>
                    <option className={styles.option} value="Public transport">
                      Public transport
                    </option>
                  </select>
                </label>
              </div>
            </div>
            <div className={styles.question_container}>
              <div className={styles.question_text}>
                3. Do you recycle your waste?*
              </div>
              <div className={styles.multiple_selection} style={{marginBottom: "2.5rem"}}>
                <label>
                  <select
                    className={styles.dropdown_list}
                    value={question3}
                    onChange={(e) => setQuestion3(e.target.value)}
                  >
                    <option className={styles.option} value="">
                      Select an option
                    </option>
                    <option className={styles.option} value="Yes">
                      Yes
                    </option>
                    <option className={styles.option} value="No">
                      No
                    </option>
                  </select>
                </label>
              </div>
            </div>
          </>)}
          {currentStep === 2 && (
          <><div className={styles.question_container}>
            <div className={styles.question_text}>
              4. How many people are in your household?*
            </div>
            <div className={styles.multiple_selection}>
              <label>
                <input
                  className={`${styles.input_num} ${inputcheck && isNaN(numOfPeople) || 
                    !Number.isInteger(parseFloat(numOfPeople)) 
                    || parseFloat(numOfPeople) < 1}`} 
                  type="text"
                  value={numOfPeople}
                  onChange={(e) => setNumOfPeople(e.target.value)}
                  placeholder="eg: 2"
                />
              </label>
              {inputcheck && (isNaN(numOfPeople) 
                    || !Number.isInteger(parseFloat(numOfPeople))
                    || parseFloat(numOfPeople) < 1) && (
                <div className={styles.error_message}>Please enter positive integer</div>
              )}
            </div>
          </div>
          <div className={styles.question_container}>
            <div className={styles.question_text}>
              5. What is your monthly electricity comsumption in kWh?*
            </div>
            <div className={styles.multiple_selection}>
              <label>
                <input
                  className={`${styles.input_num} ${inputcheck && isNaN(electricity)
                    || parseFloat(electricity) < 0 }`}
                  type="text"
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  placeholder="eg: 2"
                />
              </label>
              {inputcheck && (isNaN(electricity) 
              || electricity.trim() === ""
              || parseFloat(electricity) < 0 ) && (
                <div className={styles.error_message}>Please enter positive number</div>
              )}
            </div>
          </div>
          <div className={styles.question_container}>
            <div className={styles.question_text}>
              6. What is your monthly gas consumption in MJ?*
            </div>
            <div className={styles.multiple_selection}>
              <label>
                <input
                  className={`${styles.input_num} ${inputcheck && isNaN(gas)
                    || parseFloat(gas) < 0 }`}
                  type="text"
                  value={gas}
                  onChange={(e) => setGas(e.target.value)}
                  placeholder="eg: 234"
                />
              </label>
              {inputcheck && (isNaN(gas) 
              || gas.trim() === ""
              || parseFloat(gas) < 0 ) && (
                <div className={styles.error_message}>Please enter positive number</div>
              )}
            </div>
          </div>
          <div className={styles.question_container} style={{marginBottom: "1.5rem"} }>
            <div className={styles.question_text}>7. What is your postcode?*(Victoria)</div>
            <div className={styles.multiple_selection } style={{marginBottom: "1rem"}}>
              <label>
                <input
                  className={`${styles.input_num} ${inputcheck && isNaN(postcode) || 
                    !Number.isInteger(parseFloat(postcode)) 
                    || parseFloat(postcode) < 3000 
                    || parseFloat(postcode) > 3999}`}
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="eg: 3007"
                />
              </label>
              {inputcheck && (isNaN(postcode) 
              || !Number.isInteger(parseFloat(postcode)) 
              || parseFloat(postcode) < 3000 
              || parseFloat(postcode) > 3999) && (
                <div className={styles.error_message}>Please enter valid postcode</div>
              )}
            </div>
          </div>
          </>)}
        </div>
      </div>
      <div className={styles.button_container}>
        <div className={styles.center}>
          {currentStep !== 1 && (
              <button className={styles.button} onClick={handlePreviousStep}>
                Previous
              </button>
            )}
            {currentStep !== 2 && (
              <button className={styles.button} onClick={handleNextStep}>
                Next
              </button>
            )}
            {currentStep === 2 && (
              <button className={styles.button} onClick={handleNextStep} style={{marginTop: "1.5rem"} }>
                Calculate
              </button>
            )}
        </div>
      </div>
      <div className={styles.error_message}>
        {inputcheck && <p>{inputcheck}</p>}
      </div>
      </div>
    </div>
  );
}

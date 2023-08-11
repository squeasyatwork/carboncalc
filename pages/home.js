<<<<<<< HEAD
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
  const [message, setMessage] = useState("");

  const router = useRouter();

  function sendInput() {
    /*check the input is not a decimal*/
    const nonDecimal = /^\d+$/;

    if (
      question1.trim() == "" ||
      question2.trim() == "" ||
      question3.trim() == "" ||
      numOfPeople.trim() == "" ||
      electricity.trim() == "" ||
      gas.trim() == "" ||
      postcode.trim() == ""
    ) {
      setInputcheck("Please fill in all the fields!");
      return;
    } else {
      if (
        isNaN(numOfPeople) ||
        isNaN(electricity) ||
        isNaN(gas) ||
        isNaN(postcode)
      ) {
        setInputcheck("Please enter valid numbers!");
        return;
      } else {
        if (numOfPeople < 0 || electricity < 0 || gas < 0) {
          setInputcheck("Please enter valid numbers!");
          return;
        }
        if (postcode < 3000 || postcode > 3999) {
          setInputcheck("Please enter valid postcode!");
          return;
        } else {
          if (!nonDecimal.test(numOfPeople) || !nonDecimal.test(postcode)) {
            setInputcheck("Please enter valid numbers!");
            return;
          }
        }
      }
    }
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
    // try {
    //   const response = await fetch(`/api/submit`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       question1,
    //       question2,
    //       question3,
    //       numOfPeople,
    //       electricity,
    //       gas,
    //       postcode,
    //     }),
    //   });
    //   const data = await response.json();
    //   setMessage(data.message);
    //   console.log("Response to POST method received successfully.");
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    //   setMessage("An error occurred.");
    // }
    // router.push("/results");
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
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your household's diet?
          </div>
          <div className={styles.multiple_selection}>
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
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your primary method of transport?
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
            *Do you recycle your waste?
          </div>
          <div className={styles.multiple_selection}>
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
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *How many people are in your household?
          </div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={numOfPeople}
                onChange={(e) => setNumOfPeople(e.target.value)}
                placeholder="eg: 2"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your monthly electricity comsumption in kWh?
          </div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
                placeholder="eg: 2"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your monthly gas consumption in MJ?
          </div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={gas}
                onChange={(e) => setGas(e.target.value)}
                placeholder="eg: 234"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>*What is your postcode?</div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="eg: 3007"
              />
            </label>
          </div>
        </div>
      </div>
      <button className={styles.button} onClick={() => sendInput()}>
        Calculate
      </button>
      <div className={styles.error_message}>
        {inputcheck && <p>{inputcheck}</p>}
      </div>
    </div>
  );
}
=======
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
  const [message, setMessage] = useState("");

  const router = useRouter();

  function sendInput() {
    /*check the input is not a decimal*/
    const nonDecimal = /^\d+$/;

    if (
      question1.trim() == "" ||
      question2.trim() == "" ||
      question3.trim() == "" ||
      numOfPeople.trim() == "" ||
      electricity.trim() == "" ||
      gas.trim() == "" ||
      postcode.trim() == ""
    ) {
      setInputcheck("Please fill in all the fields!");
      return;
    } else {
      if (
        isNaN(numOfPeople) ||
        isNaN(electricity) ||
        isNaN(gas) ||
        isNaN(postcode)
      ) {
        setInputcheck("Please enter valid numbers!");
        return;
      } else {
        if (numOfPeople < 0 || electricity < 0 || gas < 0) {
          setInputcheck("Please enter valid numbers!");
          return;
        }
        if (postcode < 3000 || postcode > 3999) {
          setInputcheck("Please enter valid postcode!");
          return;
        } else {
          if (!nonDecimal.test(numOfPeople) || !nonDecimal.test(postcode)) {
            setInputcheck("Please enter valid numbers!");
            return;
          }
        }
      }
    }
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
    // try {
    //   const response = await fetch(`/api/submit`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       question1,
    //       question2,
    //       question3,
    //       numOfPeople,
    //       electricity,
    //       gas,
    //       postcode,
    //     }),
    //   });
    //   const data = await response.json();
    //   setMessage(data.message);
    //   console.log("Response to POST method received successfully.");
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    //   setMessage("An error occurred.");
    // }
    // router.push("/results");
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
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your household's diet?
          </div>
          <div className={styles.multiple_selection}>
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
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your primary method of transport?
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
            *Do you recycle your waste?
          </div>
          <div className={styles.multiple_selection}>
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
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *How many people are in your household?
          </div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={numOfPeople}
                onChange={(e) => setNumOfPeople(e.target.value)}
                placeholder="eg: 2"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your monthly electricity comsumption in kWh?
          </div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
                placeholder="eg: 2"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>
            *What is your monthly gas consumption in MJ?
          </div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={gas}
                onChange={(e) => setGas(e.target.value)}
                placeholder="eg: 234"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>*What is your postcode?</div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="eg: 3007"
              />
            </label>
          </div>
        </div>
      </div>
      <button className={styles.button} onClick={() => sendInput()}>
        Calculate
      </button>
      <div className={styles.error_message}>
        {inputcheck && <p>{inputcheck}</p>}
      </div>
    </div>
  );
}
>>>>>>> origin/root

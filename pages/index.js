"use client";

import React, { useState } from "react";
import "@app/globals.css";
import styles from "../app/Home.module.css";
import Router from "next/router";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState("");

  function sendInput() {
    if (username == "superfivers" && password == "5superKarbonKalc")
      Router.push({
        pathname: "/home",
      });
    else {
      setFailedLogin("Wrong credentials. Try again.");
      return;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>CARBON CALC</h1>
      </div>
      <div className={styles.text_container}>
        Is that you, admin? Welcome!<br></br>Log in to get going
      </div>
      <div className={styles.content_container}>
        <div className={styles.question_container}>
          <div className={styles.question_text}>Username</div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="eg: foo123b@r"
              />
            </label>
          </div>
        </div>
        <div className={styles.question_container}>
          <div className={styles.question_text}>Password</div>
          <div className={styles.multiple_selection}>
            <label>
              <input
                className={styles.input_num}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password goes here"
              />
            </label>
          </div>
        </div>
      </div>
      <button className={styles.button} onClick={() => sendInput()}>
        Log in
      </button>
      <div className={styles.error_message}>
        {failedLogin && <p>{failedLogin}</p>}
      </div>
    </div>
  );
}

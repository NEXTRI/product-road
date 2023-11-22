"use client";
import React, { useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { divider, hstack, vstack } from "@/styled-system/patterns";
import { Spinner } from "@/components/Spinner";
import { loginOTP, loginWithGithub } from "../actions";
type Props = {};

const LoginForm = (props: Props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    const [data, error] = await loginOTP(email);
    if (data) {
      setIsLoading(false);
    }
    if (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  const signInWithGithub = async () => {
    const [data, error] = await loginWithGithub();

    if (error) {
      setIsLoading(false);
      setError(true);
    }
  };
  return (
    <div
      className={hstack({
        w: "full",
        flexGrow: 1,
        justify: "center",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          w: "full",
          maxWidth: "400px",
        })}
      >
        <h1
          className={css({
            fontSize: "3xl",
            md: { fontSize: "4xl" },
            fontWeight: "semibold",
          })}
        >
          Log in
        </h1>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            my: "5",
          })}
        >
          {error && (
            <span
              className={css({
                p: 3,
                fontSize: "small",
                backgroundColor: "red.300",
                border: "1px solid",
                borderColor: "red.400!important",
                color: "red.900",
              })}
            >
              Login failed. Please check your email and try again.
            </span>
          )}
          <input
            type="text"
            name="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            className={css({
              my: "3",
              p: "3",
              rounded: "md",
              outline: "none",
              border: "1px solid",
              borderColor: "gray.200",
            })}
            placeholder="email"
          />
          <button
            className={css({
              bg: "frenchRose",
              color: "white",
              my: "3",
              p: "3",
              rounded: "md",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              justifyContent: "center",
            })}
            disabled={isLoading}
            type="button"
            onClick={() => signIn()}
          >
            {isLoading ? <Spinner size="24px" /> : "Submit"}
          </button>
          <div
            className={hstack({
              alignItems: "center",
            })}
          >
            <div className={divider({ orientation: "horizontal", me: 1 })} />
            or
            <div className={divider({ orientation: "horizontal", ms: 1 })} />
          </div>
          <button
            type="button"
            className={css({
              color: "white",
              bg: "black",
              my: "3",
              p: "3",
              rounded: "md",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            })}
            onClick={signInWithGithub}
          >
            Sign In with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

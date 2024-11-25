import React from "react";
import Image from "next/image";
import Wallpaper from "../assets/Wallpaper.svg";
import accountIcon from "../assets/account.svg";
import lockIcon from "../assets/lock.svg";
import Input from "@bri/shared/input";
import { Button } from "@bri/shared/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [state, setState] = React.useState({
    token: "",
    password: "",
  });
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setError(() => null);
    setLoading(() => true);
    setDisabled(() => true);
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    }).then(async (res) => {
      const data = await res.json();
      if (data.status > 200) {
        setError(() => data.message);
        setLoading(() => false);
        setDisabled(() => false);
      }

      if (data.status <= 200) {
        window.location.reload();
      }
    });
  }

  React.useEffect(() => {
    let disabled = true;
    if (state.token && state.password) {
      disabled = false;
    }
    setDisabled(() => disabled);
  }, [state.token, state.password]);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      {error ? (
        <div className="fixed top-0 left-0 w-full p-4 bg-red-500 text-white font-poppins text-center">
          {error}
        </div>
      ) : null}
      <div className="h-[60vh] w-full flex items-center justify-center">
        <div>
          <div className="w-fit text-center leading-[60px]">
            <div className="text-[120px] font-bold text-black font-smooch">
              Welcome
            </div>
            <span className="text-[14px] font-poppins">
              We are glad to see you back with us
            </span>
          </div>
          <div className="mt-2">
            <Input
              id="username-input__testid"
              type="text"
              name="token"
              placeholder="Username"
              value={state.token}
              onChange={onChange}
              icon={
                <Image
                  src={accountIcon}
                  alt={accountIcon}
                  className="w-[24px] h-[24px] mr-2"
                />
              }
            />
          </div>
          <div className="mt-6">
            <Input
              type="password"
              id="password-input__testid"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={onChange}
              icon={
                <Image
                  src={lockIcon}
                  alt={lockIcon}
                  className="w-[24px] h-[24px] mr-2"
                />
              }
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <Button
              id="button-login__testid"
              type="button"
              disabled={disabled}
              loading={loading}
              onClick={onSubmit}
            >
              <span>Next</span>
            </Button>
          </div>
          <div className="text-center mt-7 font-poppins">
            You Don't have an account ?{" "}
            <span
              className="cursor-pointer hover:text-blue-500 hover:underline"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Image src={Wallpaper} alt={Wallpaper} />
      </div>
    </div>
  );
}

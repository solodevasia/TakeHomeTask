import "@bri/styles/globals.scss";
import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {store} from "@bri/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

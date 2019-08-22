import React from "react";
import { render } from "react-dom";
import { useFetch } from "react-hooks-async";

const TestApp = () => {
  const result = useFetch("https://yesno.wtf/api");
  if (result.pending) {
    return <h1> loading ...</h1>;
  }
  if (result.error) {
    return <h1> error ...</h1>;
  }
  return result.result.answer;
};
render(<TestApp />, document.getElementById("root"));

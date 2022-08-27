import { render } from "ink";
import BigText from "ink-big-text";
import React from "react";

const Title = () => {
  return <BigText text="WTFIMH" colors={["system", "candy"]} />;
};

render(<Title />);

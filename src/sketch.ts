import P5 from "p5";
import { cat } from "./functions";

const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(500, 500);
    cat();
  };
  p5.draw = () => {
    p5.background(80);
  };
};

new P5(sketch);

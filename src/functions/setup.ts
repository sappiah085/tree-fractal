import p5 from "p5";
import { variables } from "../common/variables";
export function setup(p5: p5): void {
  p5.createCanvas(variables.w_grid, variables.h_grid);
  p5.background(0);

}

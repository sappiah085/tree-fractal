import p5 from "p5";
import { Line } from "../class/line";
import { variables } from "../common/variables";
import { dir } from "../common/enums";
let length = 200;
let maxGenerations = 90;
let stem = new Line(
  variables.w_grid / 2,
  variables.h_grid / 1.2,
  70,
  Math.PI / 2,
  0
);
let lookedAt: Line[] = [];
let toLook = [stem];

export const draw = (p: p5) => {
  if (toLook.length > 0) {
    let removed_line = toLook.shift();
    if (removed_line && removed_line._generation < maxGenerations) {
      lookedAt.push(removed_line);

      const { x, y, angle: parentAngle } = removed_line.getNode();
      const gen = removed_line._generation + 1;
      const branchLength = length * Math.pow(0.77, gen); // Scale branch length

      // Branch angle offset
      const branchAngleOffset = Math.PI / 6;

      // Left branch (relative to parent, normalized to positive angle)
      const leftBranchAngle =
        (parentAngle - branchAngleOffset + 2 * Math.PI) % (2 * Math.PI);
      const lb = new Line(x, y, branchLength, leftBranchAngle, gen);

      // Right branch (relative to parent, normalized to positive angle)
      const rightBranchAngle =
        (parentAngle + branchAngleOffset + 2 * Math.PI) % (2 * Math.PI);
      const rb = new Line(x, y, branchLength, rightBranchAngle, gen);

      toLook.push(lb, rb);
    }
  }

  // Draw all branches
  for (let b = 0; b < lookedAt.length; b++) {
    const color = p.constrain(b + 60, 0, 255);
    lookedAt[b].show(p, color);
  }

  // Stop drawing if no branches left to process
  if (toLook.length === 0) {
    p.noLoop();
  }
};

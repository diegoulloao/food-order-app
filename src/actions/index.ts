import * as orderActions from "./order";
import * as consultActions from "./consult";

export const server = {
  ...orderActions,
  ...consultActions,
};

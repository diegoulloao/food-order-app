import * as orderActions from "./order";
import * as consultActions from "./consult";
import * as loginActions from "./login";

export const server = {
  ...orderActions,
  ...consultActions,
  ...loginActions,
};

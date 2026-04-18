import { c as createSsrRpc } from "./router-CIQ6pUrp.mjs";
import { c as createServerFn } from "./index.mjs";
const registerUserFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("ce6775224b1bc8ae38e13d2023b8489fd0119ee9096eb473464dc2dab7115a47"));
const loginUserFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("8d071efc9d54e34c7535b51e385fcb60a03cc21e4c6d4fbd3e8480833fc7e703"));
export {
  loginUserFn as l,
  registerUserFn as r
};

import { setup } from "xstate";

export const machine = setup({
  types: {
    context: {} as {},
    events: {} as { type: "finish" },
  },
}).createMachine({
  context: {},
  id: "shrimp",
  initial: "login",
  states: {
    login: {
      on: {
        finish: {
          target: "loggedIn",
        },
      },
    },
    loggedIn: {},
  },
});

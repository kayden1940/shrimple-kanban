import { output } from '@pulumi/pulumi';
import { setup, fromPromise, createMachine } from "xstate";

export const machine = setup({
  actors: {
    pwExistCheck: fromPromise(async () => {
      try {
        return true
      } catch (error) {
        throw new Error("error, pwExistCheck");
      }
    }),
    callPwSet: createMachine({
      /* ... */
    }),
    callSignIn: createMachine({
      /* ... */
    }),
    bdsExistCheck: createMachine({
      /* ... */
    }),
    callCreateBlock: createMachine({
      /* ... */
    }),
    bdExistCheck: createMachine({
      /* ... */
    }),
  },
  guards: {
    pwExist: function ({ context, event }) {
      // Add your guard condition here
      return event.output;
    },
    bdsExist: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    signInCorrect: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  context: {},
  id: "board",
  initial: "fetchPassword",
  states: {
    fetchPassword: {
      invoke: {
        id: "(machine).asyncGuard:invocation[0]",
        input: {},
        onDone: [
          {
            target: "toBeSignIn",
            guard: {
              type: "pwExist",
            },
          },
          {
            target: "pwSet",
          },
        ],
        onError: {
          target: "error",
        },
        src: "pwExistCheck",
      },
    },
    toBeSignIn: {
      on: {
        TO_SIGN_IN: {
          target: "signIn",
        },
      },
    },
    pwSet: {
      invoke: {
        input: {},
        onDone: {
          target: "fetchBoards",
        },
        onError: {
          target: "error",
        },
        src: "callPwSet",
      },
    },
    error: {
      on: {
        TO_FETCH_PASSWORD: {
          target: "fetchPassword",
        },
      },
    },
    signIn: {
      invoke: {
        input: {},
        onDone: [
          {
            target: "fetchBoards",
            guard: {
              type: "signInCorrect",
            },
          },
          {
            target: "signIn",
          },
        ],
        onError: {
          target: "error",
        },
        src: "callSignIn",
      },
    },
    fetchBoards: {
      invoke: {
        input: {},
        onDone: [
          {
            target: "boards",
            guard: {
              type: "bdsExist",
            },
          },
          {
            target: "createBoard",
          },
        ],
        onError: {
          target: "error",
        },
        src: "bdsExistCheck",
      },
    },
    boards: {
      on: {
        SELECT: {
          target: "fetchBoard",
        },
        TO_CREATE_BOARD: {
          target: "createBoard",
        },
      },
    },
    createBoard: {
      invoke: {
        input: {},
        onDone: {
          target: "board",
        },
        onError: {
          target: "error",
        },
        src: "callCreateBlock",
      },
    },
    fetchBoard: {
      invoke: {
        input: {},
        onDone: {
          target: "board",
        },
        onError: {
          target: "error",
        },
        src: "bdExistCheck",
      },
    },
    board: {
      on: {
        TO_BOARDS: {
          target: "boards",
        },
      },
    },
  },
});
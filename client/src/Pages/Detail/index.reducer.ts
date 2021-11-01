import React from "react";

type State =
  | {
      _t: "map";
    }
  | {
      _t: "list";
      isScrollUp: boolean;
    };

type Action =
  | {
      _t: "toggle";
    }
  | {
      _t: "scroll";
      scrollY: number;
    };

export const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "toggle": {
      switch (prevState._t) {
        case "list":
          return {
            _t: "map",
          };
        case "map":
          return {
            _t: "list",
            isScrollUp: false,
          };
      }
      break;
    }
    case "scroll": {
      switch (prevState._t) {
        case "map":
          return { ...prevState };
        case "list":
          return {
            ...prevState,
            isScrollUp: action.scrollY > 100,
          };
      }
      break;
    }
  }
};

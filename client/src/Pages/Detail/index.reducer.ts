import React from "react";

type State =
  | {
      _t: "map";
      sliderCurrent: number;
      isSelected: boolean;
    }
  | {
      _t: "list";
      isScrollUp: boolean;
      sliderCurrent: number;
      isSelected: boolean;
    };

type Action =
  | {
      _t: "toggle";
    }
  | {
      _t: "scroll";
      scrollY: number;
    }
  | {
      _t: "select";
      sliderCurrent: number;
      isSelected: boolean;
    };

export const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "toggle": {
      switch (prevState._t) {
        case "list":
          return {
            _t: "map",
            sliderCurrent: 0,
            isSelected: false,
          };
        case "map":
          return {
            _t: "list",
            isScrollUp: false,
            sliderCurrent: 0,
            isSelected: false,
          };
      }
      break;
    }
    case "select":
      return {
        _t: "map",
        sliderCurrent: action.sliderCurrent,
        isSelected: true,
      };
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

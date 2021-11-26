type State =
  | {
      _t: "map";
      sliderCurrent: number;
      isSelected: boolean;
    }
  | {
      _t: "list";
      sliderCurrent: number;
      isSelected: boolean;
    };

type Action =
  | {
      _t: "toggle";
    }
  | {
      _t: "select";
      sliderCurrent: number;
      isSelected: boolean;
    };

export const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "toggle":
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
            sliderCurrent: 0,
            isSelected: false,
          };
      }
      break;
    case "select":
      return {
        _t: "map",
        sliderCurrent: action.sliderCurrent,
        isSelected: true,
      };
  }
};

type State =
  | {
      _t: null;
      isLocked: boolean;
      selected: number[];
    }
  | {
      _t: "make";
      isLocked: boolean;
      selected: number[];
    }
  | {
      _t: "theme";
      isLocked: boolean;
      selected: number[];
    };

type Action =
  | {
      _t: "SET";
      selected: number[];
    }
  | {
      _t: "MAKE";
      isLocked: boolean;
    }
  | {
      _t: "SELECT";
      selected: number;
    }
  | {
      _t: "REMOVE";
      selected: number;
    };

export const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "SET":
      return {
        _t: "theme",
        isLocked: false,
        selected: action.selected,
      };
    case "MAKE":
      return {
        _t: "make",
        isLocked: action.isLocked,
        selected: prevState.selected,
      };
    case "SELECT":
      return {
        _t: "theme",
        isLocked: false,
        selected: [...prevState.selected, action.selected],
      };
    case "REMOVE":
      const idx = prevState.selected.findIndex((i) => i === action.selected);
      return {
        _t: "theme",
        isLocked: false,
        selected: [
          ...prevState.selected.slice(0, idx),
          ...prevState.selected.slice(idx + 1, prevState.selected.length),
        ],
      };
  }
};

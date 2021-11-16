type State =
  | {
      _t: "map";
    }
  | {
      _t: "list";
    };

export const reducer: React.Reducer<State, void> = (prevState) => {
  switch (prevState._t) {
    case "list":
      return {
        _t: "map",
      };
    case "map":
      return {
        _t: "list",
      };
  }
};

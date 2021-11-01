import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN as string);
console.log(process.env.REACT_APP_MIXPANEL_TOKEN);

interface Dict {
  [key: string]: any;
}

// let env_check = process.env.NODE_ENV === "production";
let env_check = true;

let actions = {
  identify: (id: string) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: string, props?: Dict | undefined) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: Dict) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;

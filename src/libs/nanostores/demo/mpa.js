import { map, onSet } from "nanostores";

const defaultValue = JSON.parse(
  sessionStorage.getItem("_user") ??
    JSON.stringify({
      age: 18,
    })
);

export const user = map(defaultValue);

onSet(user, ({ newValue, abort }) => {
  sessionStorage.setItem("_user", JSON.stringify(newValue));
});

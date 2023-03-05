import { useHackformerStore } from "./store";

export const Credentials = () => {
  const {
    credentials: { org, key, setCredentials },
  } = useHackformerStore();
  return (
    <fieldset>
      <label>
        Org{" "}
        <input
          value={org}
          onChange={(e) => setCredentials({ org: e.target.value })}
        />
      </label>
      <label>
        Key{" "}
        <input
          value={key}
          onChange={(e) => setCredentials({ key: e.target.value })}
        />
      </label>
    </fieldset>
  );
};

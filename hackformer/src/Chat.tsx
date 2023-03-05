import { useHackformerStore } from "./store";

export const Chat = () => {
  const { chat } = useHackformerStore();
  return (
    <>
      <header>
        <label>
          Question{" "}
          <input
            value={chat.prompt}
            onChange={(e) => chat.set({ prompt: e.target.value })}
          />
        </label>
        <button onClick={() => chat.run()}>Chat</button>
      </header>
      <main>
        <dl>
          <dt>prompt</dt>
          <dd>{chat.prompt}</dd>
          <dt>googlePrompt</dt>
          <dd>{chat.googlePrompt}</dd>
          <dt>wikipediaPrompt</dt>
          <dd>{chat.wikipediaPrompt}</dd>
          <dt>wolframAlphaPrompt</dt>
          <dd>{chat.wolframAlphaPrompt}</dd>
          <dt>googleResponse</dt>
          <dd>{chat.googleResponse}</dd>
          <dt>wikipediaResponse</dt>
          <dd>{chat.wikipediaResponse}</dd>
          <dt>wolframAlphaResponse</dt>
          <dd>{chat.wolframAlphaResponse}</dd>
          <dt>finalPrompt</dt>
          <dd>{chat.finalPrompt}</dd>
          <dt>finalResponse</dt>
          <dd>{chat.finalResponse}</dd>
        </dl>
      </main>
    </>
  );
};

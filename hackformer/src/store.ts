import produce from "immer";
import { create } from "zustand";

// "Present a biography of the first president of Sudan"
const START_PROMPT = "How far is it from Chicago to Tokyo?";

interface Credentials {
  org: string;
  key: string;
  serpApi: string;
  wolframAlphaApi: string;
  setCredentials: (cred: {
    org?: string;
    key?: string;
    serpApi?: string;
    wolframAlphaApi?: string;
  }) => void;
}

interface Chat {
  prompt: string;
  googlePrompt: string;
  wikipediaPrompt: string;
  wolframAlphaPrompt: string;
  googleResponse: string;
  wikipediaResponse: string;
  wolframAlphaResponse: string;
  finalPrompt: string;
  finalResponse: string;
  set: (args: {
    prompt?: string;
    // googlePrompt?: string;
    // wikipediaPrompt?: string;
    // wolframAlphaPrompt?: string;
    // googleResponse?: string;
    // wikipediaResponse?: string;
    // wolframAlphaResponse?: string;
    // finalPrompt?: string;
    // finalResponse?: string;
  }) => void;
  run(): void;
}

export const useHackformerStore = create<{
  credentials: Credentials;
  chat: Chat;
}>((set, get) => ({
  credentials: {
    org: import.meta.env.VITE_OPENAI_ORG ?? "",
    key: import.meta.env.VITE_OPENAI_KEY ?? "",
    serpApi: import.meta.env.VITE_SERP_API ?? "",
    wolframAlphaApi: import.meta.env.VITE_WOLFRAM_ALPHA_APP ?? "",
    setCredentials: ({
      org = get().credentials.org,
      key = get().credentials.key,
      serpApi = get().credentials.serpApi,
      wolframAlphaApi = get().credentials.wolframAlphaApi,
    }: {
      org?: string;
      key?: string;
      serpApi?: string;
      wolframAlphaApi?: string;
    }) =>
      set(
        produce((state) => {
          state.org = org;
          state.key = key;
          state.serpApi = serpApi;
          state.wolframAlphaApi = wolframAlphaApi;
        })
      ),
  },
  chat: {
    prompt: START_PROMPT,
    set: ({ prompt = get().chat.prompt }: { prompt?: string }) =>
      set(
        produce((state) => {
          state.chat.prompt = prompt;
        })
      ),
    run: async () => {
      const response = await fetch(
        `http://localhost:3000/api/chat?q=${get().chat.prompt}`
      );
      if (!response.ok) {
        console.warn(
          "Bad run",
          response.status,
          response.statusText,
          await response.text()
        );
      }
      const {
        googlePrompt,
        wikipediaPrompt,
        wolframAlphaPrompt,
        googleResponse,
        wikipediaResponse,
        wolframAlphaResponse,
        finalPrompt,
        finalResponse,
      } = await response.json();
      set(
        produce((state) => {
          state.chat.googlePrompt = googlePrompt;
          state.chat.wikipediaPrompt = wikipediaPrompt;
          state.chat.wolframAlphaPrompt = wolframAlphaPrompt;
          state.chat.googleResponse = googleResponse;
          state.chat.wikipediaResponse = wikipediaResponse;
          state.chat.wolframAlphaResponse = wolframAlphaResponse;
          state.chat.finalPrompt = finalPrompt;
          state.chat.finalResponse = finalResponse;
        })
      );
    },
  },
}));

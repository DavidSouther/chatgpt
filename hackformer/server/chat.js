import {} from "dotenv/config";

export const run = async (prompt) => {
  const [googlePrompt, wolframAlphaPrompt, wikipediaPrompt] = await Promise.all(
    [
      ...["Google", "WolframAlpha", "Wikipedia"].map((service) =>
        makeOpenAiRequest(
          `create a suitable query for a ${service} search from this text.\n${prompt}`
        )
      ),
    ]
  );

  const [googleResponse, wikipediaResponse, wolframAlphaResponse] =
    await Promise.all(
      [
        () => askGoogle(googlePrompt),
        () => askWikipedia(wikipediaPrompt),
        () => askWolframAlpha(wolframAlphaPrompt),
      ].map(async (fn) => {
        try {
          return await fn();
        } catch (e) {
          console.warn(e);
          // return `FAILED TO LOAD ${fn.name}, ignore this part of the prompt.`;
          return ``;
        }
      })
    );

  const finalPrompt = `Synthesize an answer to this prompt using the following responses. Do not assume any other information. Do not make up any facts not present here. Do not mention missing sources.
      
      PROMPT: ${prompt}

      WOLFRAM ALPHA:
      '''
      ${wolframAlphaResponse}
      '''
      
      GOOGLE: 
      '''
      ${googleResponse}
      '''

      WIKIPEDIA: 
      '''
      ${wikipediaResponse}
      '''
      `;
  const finalResponse = await makeOpenAiRequest(finalPrompt);

  return {
    googleResponse,
    wikipediaResponse,
    wolframAlphaResponse,
    googlePrompt,
    wikipediaPrompt,
    wolframAlphaPrompt,
    finalPrompt,
    finalResponse,
  };
};

const makeOpenAiRequest = async (content) => {
  const org = process.env.OPENAI_ORG;
  const key = process.env.OPENAI_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const message = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
  };

  const body = JSON.stringify(message);

  // make fetch happen
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "OpenAI-Organization": `${org}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson.choices[0].message.content;
  } else {
    const error = await response.text();
    return `${response.status} ${response.statusText} ${error}`;
  }
};

const askGoogle = async (prompt) => {
  const apiKey = process.env.SERP_API;
  const serpUrl = `https://serpapi.com/search.json?q=${prompt
    .replaceAll(/\s+/g, "+")
    .replaceAll('"', "")}&api_key=${apiKey}`;
  console.log("serpUrl", serpUrl);
  const serpApiResponse = await fetch(serpUrl);

  if (!serpApiResponse.ok) {
    console.warn(
      `askGoogle failed`,
      apiResponse.status,
      apiResponse.statusText,
      await apiResponse.text()
    );
    return "MISSING RESULTS FROM GOOGLE. DO NOT USE THIS SECTION.";
  }

  const serpApi = await serpApiResponse.json();
  const results = serpApi["organic_results"] ?? [];
  return results
    .map(
      (result) =>
        `${result?.title}\n${result?.snippet}\n${result?.about_this_result?.source?.description}`
    )
    .join("");
};
const askWikipedia = async (prompt) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${prompt
    .trim()
    .replaceAll('"', "")}`;
  const apiResponse = await fetch(url);

  if (!apiResponse.ok) {
    console.warn(
      `askWikipedia failed`,
      apiResponse.status,
      apiResponse.statusText,
      await apiResponse.text()
    );
    return "MISSING RESULTS FROM WIKIPEDIA. DO NOT USE THIS SECTION.";
  }

  const api = await apiResponse.json();
  const results = api.query?.search ?? [];
  return results
    .map(
      (result) =>
        `${result?.title}\n${result?.snippet?.replace(/(<([^>]+)>)/gi, " ")}`
    )
    .join("");
};

const askWolframAlpha = async (prompt) => {
  const key = process.env.WOLFRAM_ALPHA_APP;
  const url = `https://api.wolframalpha.com/v1/result?i=${prompt.replaceAll(
    " ",
    "+"
  )}&appid=${key}`;

  const apiResponse = await fetch(url);

  if (!apiResponse.ok) {
    console.warn(
      `askWolframAlpha failed`,
      apiResponse.status,
      apiResponse.statusText,
      await apiResponse.text()
    );
    return "MISSING RESULTS FROM WOLFRAM ALPHA. DO NOT USE THIS SECTION.";
    // return "6313 miles";
  }

  const api = await apiResponse.text();
  return api;
};

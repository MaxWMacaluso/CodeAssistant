const { Configuration, OpenAIApi } = require("openai");

// So the program can find .env file
require('dotenv').config({path : '../.env'});

class OpenAI {
  // PRIVATE class attributes
  #language;
  #level;
  #code;
  #query;
  #response;

  // CONSTRUCTOR
  constructor(language, level, code) {
    this.#language = language;
    this.#level = level;
    this.#code = code;
    this.#query = '';
    this.#response = '';
  }

  // GETTERS
  get language() {
    return this.#language;
  }
  get level() {
    return this.#level;
  }
  get code() {
    return this.#code;
  }
  get query() {
    return this.#query;
  }
  get response() {
    return this.#response;
  }

  // SETTERS
  set language(x) {
    this.#language = x;
  }
  set level(x) {
    this.#level = x;
  }
  set code(x) {
    this.#code = x;
  }
  set query(x) {
    this.#query = x;
  }
  set response(x) {
    this.#response = x;
  }

  // METHODS
  // query = code + level + language
  formQueryFromInputs() {
    // Invokes the setter
    this.query = '# Python 3\n' + this.code + '\n\n\"\"\"\nExplanation of what the Python 3 code does in bullet points:';
  }
  // Perfoms openAI API Call and stores `response.data` result in #response
  async makeOpenAICall() {
    try {
      const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, });
      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: this.query,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
      });

      this.response = response.data;
    }
    catch (err) {
      console.log(err);
      response.status(500).send('Something went wrong');
    }
  }
}

module.exports = OpenAI;

const { Configuration, OpenAIApi } = require("openai");

// So the program can find .env file
require('dotenv').config({path : '../.env'});

// GLOBAL VARIABLE
// @key language
// @value {single comment, start comment-block, stop comment-block}
var LanguageDict = {
  'Python': {Single: '#', Start: '\"\"\"', Stop: '\"\"\"'},
  'Javascript': {Single: '//', Start: '/*', Stop: '*/'},
  'Go': {Single: '//', Start: '/*', Stop: '*/'},
  'Perl': {Single: '#', Start: '=begin', Stop: '=end'},
  'PHP': {Single: '//', Start: '/*', Stop: '*/'},
  'Ruby': {Single: '#', Start: '=begin', Stop: '=end'},
  'Swift': {Single: '//', Start: '/*', Stop: '*/'},
  'TypeScript': {Single: '//', Start: '/*', Stop: '*/'},
  'Sql': {Single: '--', Start: '/*', Stop: '*/'},
  'Shell': {Single: '#', Start: ": <<\'END'", Stop: 'END'}
};

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
  // TODO: Implement level
  formQueryFromInputs() {
    const langObj = LanguageDict[this.language]
    //this.query = '# Python\n' + this.code + '\n\n\"\"\"\nExplain what the above Python code does:';
    // Invokes the setter
    this.query = langObj.Single + ' ' + this.language + '\n' + this.code + '\n\n' + langObj.Start + '\n' + 'Explain what the above ' + this.language + ' code does:';
    console.log(this.query)
  }
  // Perfoms openAI API Call and stores `response.data` result in #response
  async makeOpenAICall() {
    try {
      const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, });
      const openai = new OpenAIApi(configuration);

      const langObj = LanguageDict[this.language]
      console.log(langObj)

      const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: this.query,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: [langObj.Stop],
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

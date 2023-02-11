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
  // TODO: query = code + level + language
  formQueryFromInputs() {
    var x = "class Log:\n    def __init__(self, path):\n        dirname = os.path.dirname(path)\n        os.makedirs(dirname, exist_ok=True)\n        f = open(path, \"a+\")\n\n        # Check that the file is newline-terminated\n        size = os.path.getsize(path)\n        if size > 0:\n            f.seek(size - 1)\n            end = f.read(1)\n            if end != \"\\n\":\n                f.write(\"\\n\")\n        self.f = f\n        self.path = path\n\n    def log(self, event):\n        event[\"_event_id\"] = str(uuid.uuid4())\n        json.dump(event, self.f)\n        self.f.write(\"\\n\")\n\n    def state(self):\n        state = {\"complete\": set(), \"last\": None}\n        for line in open(self.path):\n            event = json.loads(line)\n            if event[\"type\"] == \"submit\" and event[\"success\"]:\n                state[\"complete\"].add(event[\"id\"])\n                state[\"last\"] = event\n        return state\n\n\"\"\"\nHere's what the above class is doing:\n1.";
    // Invokes the setter
    this.query = x;
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

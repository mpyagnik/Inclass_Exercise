var express = require('express');
const { Configuration, OpenAIApi } = require('openai');
var router = express.Router();

var question = "";
var completion = "";
var resObj = "";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chat Bot', resObj: resObj });
});

router.post('/', async function(req, res, next) {
  question = req.body.question;
  completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: question}],
  });
  resObj = completion.data.choices[0].message.content;
  res.redirect("/");
});

module.exports = router;

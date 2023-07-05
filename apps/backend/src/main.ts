import express from 'express';
import OpenAI from '../data-sources/openapi';
import { getRecipe } from '../data-sources/edamam';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/api', (req: any, res) => {
  res.send('welcome to speedycook');
});

app.get('/api/foods-by-ingredients', async (req: any, res) => {
  const ingredients = req.query.ingredients;
  const allergies = req.query.allergies;
  const dietaries = req.query.dietaries;
  const cookingLevel = req.query.cookingLevel;

  const completion = await OpenAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a food expert.' },
      {
        role: 'user',
        content: `give me 6 list of food that can be made with these preferences.
          - ingredients = ${ingredients}}
          - allergies = ${allergies}
          - dietaries = ${dietaries}
          - cooking level = ${cookingLevel}

        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
        [{ingredients: '', foodName: '', description: ''}]

        For description, give me a complete and detailed description of those foods
        `,
      },
    ],
  });

  try {
    const data = JSON.parse(completion.data.choices[0].message.content);
    console.log(data);

    res.send({ data });
  } catch (err) {
    console.log('aw');
    res.status(400).send(err);
  }
});

app.get(`/api/recipes`, async (req: any, res) => {
  const foodName = req.query.foodName;
  const foodArray = foodName.split(',');
  const pickedIngredients = foodArray.slice(0, 4);

  const { data } = await getRecipe(pickedIngredients);

  const found = data.hits.find((item: any) => {
    return item.recipe.label.toLowerCase() === foodName.toLowerCase();
  });

  res.send({
    data: found ? found : data.hits[0],
  });
});

app.post(`/api/recipe-instructions`, async (req: any, res) => {
  console.log(req.body);
  const foodName = req.body.foodName;
  const ingredients = req.body.ingredients;

  const completion = await OpenAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a food expert.' },
      {
        role: 'user',
        content: `how to make ${foodName} with these ingredients

        ${ingredients}

        do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.
{instructions:['']}

        and don't put index number
        `,
      },
    ],
  });

  try {
    const data = JSON.parse(completion.data.choices[0].message.content);
    console.log(data);

    res.send({ data });
  } catch (err) {
    console.log('aw');
    res.status(400).send(err);
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

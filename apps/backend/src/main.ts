import express from 'express';
import OpenAI from '../data-sources/openapi';
import { getRecipe } from '../data-sources/edamam';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/api/foods-by-ingredients', async (req: any, res) => {
  const ingredients = req.query.ingredients;
  const allergies = req.query.allergies;
  const dietaries = req.query.dietaries;

  const completion = await OpenAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `give me a list of food that can be made with these preferences.
          - ingredients = ${ingredients}}
          - allergies = ${allergies}
          - dietaries = ${dietaries}

        And return it with this json format {ingredients: '', foodName: ''}`,
      },
    ],
  });

  console.log(completion.data.choices[0].message.content);

  res.send({ message: JSON.parse(completion.data.choices[0].message.content) });
});

app.get(`/api/recipes`, async (req: any, res) => {
  const foodName = req.query.foodName;
  const { data } = await getRecipe(foodName);

  const found = data.hits.find((item: any) => {
    return item.recipe.label.toLowerCase() === foodName.toLowerCase();
  });

  res.send({
    message: found ? found : data.hits[0],
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

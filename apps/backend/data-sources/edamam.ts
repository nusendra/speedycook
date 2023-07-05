import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const APP_ID = process.env.EDAMAM_APP_ID;
const APP_KEY = process.env.EDAMAM_APP_KEY;
const TYPE = process.env.EDAMAM_TYPE;
const API_URL = process.env.EDAMAM_API_URL;

export const getRecipe = async (foodName: string) => {
  const result = await axios.get(
    `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&type=${TYPE}&q=${foodName}`
  );

  return result;
};

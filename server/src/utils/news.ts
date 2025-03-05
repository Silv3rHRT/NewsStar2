import dotenv from 'dotenv';
import axios from 'axios';
import { IStory } from '../models/story.js';

dotenv.config()

function transformStories(data: any): Array<IStory> {
   return data.map((element: any) => { return {
        title: element.title,
        content: element.content,
        imageUrl: element.urlToImage,
        category: "",
        articleUrl: element.url
      }})
}

const API_KEY = process.env.API_KEY;
const API_KEY2 = process.env.API_KEY2;


export async function fetchSearch({searchTerms, from, to, sortBy}: any, key = API_KEY): Promise<Array<IStory>> {
    const baseUrl = `https://newsapi.org/v2/everything?apiKey=${key}`
    
    const params: { [key: string]: string } = {}; //creating an object with a key of string and values of string
        
    // Conditionally add parameters if they are provided
    params.q = searchTerms; // Required parameter
    if (from) params.from = from; // Optional parameter
    if (to) params.to = to; // Optional parameter
    if (sortBy) params.sortBy = sortBy; // Optional parameter

    // Make the request to the News API
    const url = `${baseUrl}&${new URLSearchParams(params).toString()}`;
    console.log('search: requesting', url)
    const response = await axios.get(url);
    console.log('search: got response', response)

    return transformStories(response.data.articles);
}

export async function fetchNews(): Promise<Array<IStory>> {
    const url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY2 || API_KEY}`
    const response = await axios.get(url);
    return transformStories(response.data.articles)
}

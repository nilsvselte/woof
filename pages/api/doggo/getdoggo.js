import { Buffer } from "buffer";
import { error } from "console";
export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  try{
    console.log("Fetching dog");
    //TODO:add check for filesize over 1024mb if that is the case ask again
    let randoDog = await fetch("https://random.dog/woof.json");
    let randoDogURL = await randoDog.json();
    //refetch image link if filesize is over 200mb for improved speed and reliability
    console.log(randoDogURL.fileSizeBytes);
    while(randoDogURL.fileSizeBytes>200000000){
        randoDog = await fetch("https://random.dog/woof.json");
        randoDogURL = await randoDog.json();
        console.log("refetching randodog URL")
    }
    const response = await fetch(randoDogURL.url);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
  
    const isMovie = randoDogURL.url.endsWith("mp4") ? true : false;

    res.status(200).json({ image: base64, isMovie: isMovie });
  } catch (error){
    console.warn(error)
    res.status(500).json({error: error.message})
  }
}

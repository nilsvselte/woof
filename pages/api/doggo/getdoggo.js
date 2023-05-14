import { Buffer } from "buffer";
export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  console.log("Fetching dog")
  const randoDog = await fetch("https://random.dog/woof.json");
  const randoDogURL = await randoDog.json();
  const response = await fetch(randoDogURL.url);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const isMovie = randoDogURL.url.endsWith("mp4") ? true : false;

  res.status(200).json({ image: base64, isMovie: isMovie });
}

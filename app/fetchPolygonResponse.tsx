"use server";

import { polygonResponseType, polygonData } from "./polygonType";

export default async function fetchPolygonResponse(): Promise<polygonResponseType> {
  try {
    const resp = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/X:ETHUSD/prev?adjusted=true&apiKey=${process.env.POLYGON_KEY}`,
    );
    if (!resp.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await resp.json();
    //const final = JSON.parse(json);
    return json;
  } catch (err) {
    return err.message;
  }
}

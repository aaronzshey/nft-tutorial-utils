"use server";
export default async function getData(): Promise<{
  userId: number;
  id: number;
  title: string;
  body: string;
}> {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts/1");
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

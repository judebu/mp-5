
"use server";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function getUrl(alias: string): Promise<{ url: string } | null> {
  if (!alias || typeof alias !== "string") {
    return null;
  }

  const urlCollection = await getCollection(URL_COLLECTION);
  const data = await urlCollection.findOne({ alias });

  if (!data) {
    return null;
  }

  return { url: data.url };
}

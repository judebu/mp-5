"use server";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function getUrl(alias: string | string[] | undefined): Promise<string> {
    console.log(alias);
    if (typeof alias === undefined) {
        throw new Error("Alias is invalid");
    }
    console.log("Getting new URL");
    const urlCollection = await getCollection(URL_COLLECTION);
    const url = await urlCollection.findOne({ alias: alias });
    if (!url) {
        throw new Error("Alias not found");
    }
    return url.url;
}
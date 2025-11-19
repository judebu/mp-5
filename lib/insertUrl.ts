"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { AliasProps } from "@/types";

export default async function storeUrl(url: string, alias: string): Promise<AliasProps | string> {
    console.log("Storing new URL");
    if (/\s/.test(url)) { 
        //checking for whitespace
        return "Error: Invalid URL, format incorrect";
    }
    try { 
        //checking for valid URL format
        new URL(url);
    } catch (e) {
        console.log("Error: ", e);
        return "Error: Invalid URL, format incorrect";
    }
    //checking if URL is reachable

    const urlRes = await fetch(url, { method: "HEAD" })
        .then((res) => {
// console.log("URL Response Status: ", res.status);

            if (res.status < 200 || res.status > 500) {
                return "Error";
            }
        })
// catching  errors
        .catch((e) => {
            console.log("Error: ", e);
            return "Error";
        })
    if (urlRes === "Error") {
        return "Error: URL not reachable";
    }
    //storing URL
    const shortUrl = {
        alias: alias,
        url: url,
    };
    const urlCollection = await getCollection(URL_COLLECTION);
    const existingUrl = await urlCollection.findOne({ alias: shortUrl.alias });
    if (existingUrl) {
        return "Error: dis alias already exists";
    }
    const res = await urlCollection.insertOne({...shortUrl});
    if (!res.acknowledged) {
        return "Error: Failed to store URL!";
    }
    return {...shortUrl};
}
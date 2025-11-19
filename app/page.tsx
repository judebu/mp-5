"use client";
import { useState } from "react";
import createNewUrl from "@/lib/insertUrl";
import { AliasProps } from "@/types";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  const [alias, setAlias] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<AliasProps>();

  const [loading, setLoading] = useState<boolean>(false);


  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }


  
  async function handleClick(event: React.FormEvent) {
    event.preventDefault();
    if (url === "" || alias === "") {
      setError("Please enter a url and alias");
        setResult(undefined);

      return;
    }
//resetting states
      setError("");
      setResult(undefined);
      setLoading(true);
//calling server action
    const res = await createNewUrl(url, alias);
    if (typeof res === "string") {
      setLoading(false);
      setError(res);

      setResult(undefined);
    }   else
        {
        setLoading(false);
      setError("");
      setResult(res);
    }
    return;

  };
  
  return (
  <div className="w-full flex justify-center">
    <form onSubmit={handleClick} className="">
      <h1 className="text-2xl w-full text-center font-bold">Shorten Your Urls!</h1>

      <div>

        <label htmlFor="url-input">URL</label>
        <input
          id="url-input"
          type="text"
          value={url}
          placeholder="https://example.com/very/long/url"
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border-2 border-black rounded-md py-2 px-2 w-full"
        />

      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="alias-input" className="mt-1">Alias</label>

        <div className="flex flex-row items-center mb-2 flex-wrap">
          <p className="text-black mr-1">https://mp-5-jude391.vercel.app/</p>
          <input

            id="alias-input"
            type="text"
            value={alias}

            placeholder="your-custom-alias"
            onChange={(e) => setAlias(e.target.value)}
            required
            className="flex-shrink flex-1 border-2 border-black rounded-md py-2 px-2 w-full"/>
        </div>
      </div>

      <button
        type="submit"
        className="text-xl w-full bg-green-400 py-3 px-2 rounded-2xl hover:bg-green-300 hover:cursor-pointer"
      >
        {loading ? "Shortening URL..." : "Shorten"}
      </button>

      {error ? (
        <p className="text-red-500 text-center mt-2">{error}</p>
      ) : result ? (
        <div className="p-1 my-2 text-center font-bold">
          <p>Success! Your shortened URL is:</p>
          <a
            href={`https://mp-5-jude391.vercel.app/${result.alias}`}
            target="_blank"
            className="text-blue-500"
          >
            https://mp-5-jude391.vercel.app/{result.alias}
          </a>

          <button
            type="button"
            onClick={() =>
              copy(`https://mp-5-jude391.vercel.app/${result.alias}`)
            }
            className="mt-2 px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300">
            Copy</button>
        </div>
      ) : null}
    </form>
  </div>
);
}
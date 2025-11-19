import { redirect } from "next/navigation";
import getUrl from "@/lib/getUrl";

export default async function Page({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  const data = await getUrl(alias);
  console.log("alias lookup", { alias, data });

  if (!data) {
    return redirect("/");
  }
  return redirect(data.url);
}

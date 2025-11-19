import { redirect } from "next/navigation";
import getUrl from "@/lib/getUrl";

export default async function Page({ params }: { params: { alias: string } }) {
  const data = await getUrl(params.alias);

  if (!data) {
    return redirect("/");
  }

  return redirect(data.url); 
}

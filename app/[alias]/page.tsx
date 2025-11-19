import {redirect} from "next/navigation";
import getUrl from "@/lib/getUrl";

export default async function Url({params}: { params: Promise<{ url: string }> }) {
    let destination: string;
    const {url} =  await params;
    try {
        destination = await getUrl(url);
    } catch (e) {
        console.log(e);
        destination = "/";
    }
    return redirect(destination)

}
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "@/components/ChatWrapper";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string[]
  }
}

function reconstructUrl(url: string[]): string {
  return url.map(decodeURIComponent).join("/");
}

export default async function Page({ params }: PageProps) {
  
  const sessioncCookie=cookies().get("sessionId")?.value

  const reconstructedUrl = reconstructUrl(params.url);

  const sessionId =( reconstructUrl + "--" + sessioncCookie).replace(/\//g,"") 

  // Check if the URL is already indexed
  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

  const initialMessages= await ragChat.history.getMessages({amount: 10, sessionId: sessionId})

  // If the URL is not indexed, add it to the index
  if (!isAlreadyIndexed) {
    // Add the URL to the index vector table
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 }
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      const encodedUrl = encodeURIComponent(url.replace(/^\/+/, ""));
      router.push(`/${encodedUrl}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4 text-gray-100 animate-bg-shift">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">
          LinkInsight AI
        </h1>

        <p className="text-center text-xl mb-8 text-gray-300 animate-fade-in-up">
          &quot;Paste a link, ask anything. Get AI-powered insights from any web content.&quot;
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Paste your link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out text-gray-100 placeholder-gray-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform transition-all duration-300 ease-out hover:scale-105"
          >
            Analyze Content
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-400 animate-fade-in">
          After submitting a link, you can ask questions about its content, and our AI will provide insights based on the webpage.
        </p>
      </div>
    </div>
  );
}

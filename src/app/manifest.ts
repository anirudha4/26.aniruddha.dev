import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anirudha Gandhare | Sr. Software Engineer",
    short_name: "Anirudha",
    description:
      "Sr. Software Engineer at Pendo. Previously Founding Engineer at Chisellabs (acquired by Pendo). Building product analytics platforms and AI-powered product management tools since 2021.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

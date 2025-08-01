import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Youth Group Songs",
    short_name: "YG Songs",
    description: "A Church of Christ song book app",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#222222",
  };
}

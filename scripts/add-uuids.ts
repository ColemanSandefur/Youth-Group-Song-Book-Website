/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/songs.json");

const songs = JSON.parse(readFileSync(filePath, "utf8"));

const updatedSongs = songs.map((song: any) => ({
  ...song,
  uuid: song.uuid || crypto.randomUUID(), // don't overwrite if it already exists
}));

writeFileSync(filePath, JSON.stringify(updatedSongs, null, 2));

console.log("✅ GUIDs added to songs.json");

import InstallPrompt from "@/components/install-prompt";
import SongList from "@/components/song-list";

export default async function Home() {
  return (
    <>
      <InstallPrompt />
      <SongList />
    </>
  );
}

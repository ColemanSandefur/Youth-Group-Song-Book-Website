import { getSongs } from "@/app/api/songs/route";
import { Sidebar, SidebarContent } from "./ui/sidebar";
import SongButton from "./song-button";

const songs = getSongs();

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        {songs.map((song, i) => (
          <SongButton key={i} song={song} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

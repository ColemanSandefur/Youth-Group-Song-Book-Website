import SongView from "./song-view";

export default async function SongViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SongView songId={id} />;
}

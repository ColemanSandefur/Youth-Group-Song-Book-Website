import SongView from "./song-view";

export default async function SongViewPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <SongView songId={id} />;
}

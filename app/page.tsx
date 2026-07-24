import ArtworksGrid from "@/components/ArtworksGrid";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <main className="p-3 flex flex-col gap-32">
      <Menu />
      <ArtworksGrid />
    </main>
  );
}

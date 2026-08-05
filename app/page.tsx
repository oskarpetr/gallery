import Artworks from "@/components/artworks/Artworks";
import Menu from "@/components/ui/Menu";

export default function Home() {
  return (
    <main className="flex flex-col gap-32 p-3">
      <Menu />
      <Artworks />
    </main>
  );
}

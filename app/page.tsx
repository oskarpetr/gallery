import Artworks from "@/components/artworks/Artworks";
import Menu from "@/components/ui/Menu";

export default function Home() {
  return (
    <main className="p-3 flex flex-col gap-32">
      <Menu />
      <Artworks />
    </main>
  );
}

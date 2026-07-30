import RotatingText from "@/components/animation/RotatingText";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="p-3 flex flex-col gap-32">
      <div className="flex flex-col gap-1 w-fit">
        <h1 className="text-5xl">
          <RotatingText text="Page Not Found (404)" />
        </h1>
        <Link href="/">
          <RotatingText text="Click here to go back home." />
        </Link>
      </div>
    </main>
  );
}

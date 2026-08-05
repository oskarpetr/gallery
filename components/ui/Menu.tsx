import Link from "next/link";
import RotatingText from "../animation/RotatingText";

export default function Menu() {
  return (
    <div className="flex justify-between">
      <div className="flex w-fit flex-col gap-1">
        <Link href="/">
          <h1 className="text-5xl">
            <RotatingText text="Oskar's Gallery" />
          </h1>
        </Link>
        <RotatingText text="Welcome to my fields of creation." />
      </div>

      <Link href="mailto:hello@oskarpetr.com" className="h-fit">
        <RotatingText
          text="hello@oskarpetr.com"
          className="underline underline-offset-4"
        />
      </Link>
    </div>
  );
}

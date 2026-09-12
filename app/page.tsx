import Image from "next/image";
import Link from "next/link";
import { BlueTigerCubBadge } from "@/components/blue-tiger-cub-badge";
import { Reveal } from "@/components/reveal";
import { WorkGrid } from "@/components/work-grid";
import { basePath } from "@/lib/base-path";

export default function Home() {
  return (
    <>
      <section className="relative mx-auto max-w-[1560px] px-6 pb-16 pt-20 sm:px-9 sm:pt-28">
        <Reveal>
          <p className="max-w-4xl text-4xl leading-[1.35] text-text-primary sm:text-5xl lg:text-6xl">
            Hi, I am Hemant, a creative person, working as a Product
            Designer, Interaction Designer, Visual designer in Gurugram,
            India. I am working since 2022.
          </p>
        </Reveal>
        <Reveal
          delay={0.15}
          className="relative ml-[calc(50%-50vw)] mt-8 aspect-[1200/950] w-[58vw] max-w-[1000px] max-h-[26vh] overflow-hidden sm:mt-4 sm:max-h-[30vh] lg:max-h-[32vh]"
        >
          <Image
            src={`${basePath}/images/botanical-illustration.webp`}
            alt=""
            fill
            sizes="58vw"
            className="object-cover object-bottom select-none"
            priority
          />
          <div className="absolute bottom-0 right-0 z-10 w-[150px] sm:w-[220px]">
            <BlueTigerCubBadge />
          </div>
        </Reveal>
      </section>

      <WorkGrid />

      <section className="mx-auto max-w-[1560px] px-6 py-16 sm:px-9 lg:py-24">
        <Reveal>
          <p className="font-display text-6xl leading-none text-accent sm:text-7xl lg:text-8xl">
            Hemant Singh
          </p>
        </Reveal>
        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
          <Reveal delay={0.1} className="w-full max-w-md overflow-hidden rounded-sm lg:w-1/2">
            <Image
              src={`${basePath}/images/hemant-team-photo.webp`}
              alt="Hemant with teammates, all wearing hand-drawn paper bag masks"
              width={1000}
              height={909}
              className="w-full"
            />
          </Reveal>
          <Reveal delay={0.15} className="max-w-lg">
            <p className="text-2xl leading-snug text-text-primary sm:text-3xl">
              Product, interaction, and visual design — all under one name.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-text-primary underline underline-offset-4 hover:opacity-70"
            >
              More about me →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

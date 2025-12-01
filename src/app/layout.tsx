import type { Metadata } from "next";
// import { Raleway } from "next/font/google";
import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
// import { ViewTransitions } from "next-view-transitions";

import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./globals.css";

// const raleway = Raleway({
//   variable: "--font-raleway",
//   subsets: ["latin"],
//   display: "swap",
// });

const gambarino = localFont({
  src: "./gambarino.woff2",
  display: "swap",
  variable: "--font-gambarino",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: {
      template: `%s | Côte Royale Paris`,
      default: settings.data.site_title || "Côte Royale Paris",
    },
    description:
      settings.data.meta_description ||
      "Discover the exquisite collection of luxury fragrances by Côte Royale Paris. Handcrafted scents for the modern connoisseur.",
    keywords: ["perfume", "fragrance", "luxury", "côte royale", "paris", "scent", "eau de parfum"],
    openGraph: {
      title: settings.data.site_title || "Côte Royale Paris",
      description: settings.data.meta_description || "Discover the exquisite collection of luxury fragrances by Côte Royale Paris",
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/og-image.png"],
      type: "website",
      locale: "en_US",
      siteName: "Côte Royale Paris",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.data.site_title || "Côte Royale Paris",
      description: settings.data.meta_description || "Discover the exquisite collection of luxury fragrances by Côte Royale Paris",
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    // <ViewTransitions>
    <html
      lang="en"
      className={`${gambarino.variable} antialiased`}
    >
      <body className="bg-neutral-900 text-white">
        <NavBar settings={settings} />
        <main className="pt-14 md:pt-16">{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
    // </ViewTransitions>
  );
}

import { getBanners } from "@/lib/public";
import { HomeHero } from "@/components/public/home-hero";
import { HomeExplore } from "@/components/public/home-explore";

export const revalidate = 3600;

export default async function HomePage() {
  const banners = await getBanners();
  const banner = banners[0] ?? null;

  return (
    <div>
      <HomeHero banner={banner} />
      <HomeExplore />
    </div>
  );
}

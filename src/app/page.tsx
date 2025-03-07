// import components
import MainWrapper from "@/components/wrapper/MainWrapper";
import PageContent from "@/components/wrapper/PageContent";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import CategoryCarousel from "@/components/carousel/CategoryCarousel";
import DisplayAllProduct from "@/components/display/DisplayAllProduct";
import DisplayTrendingCollections from "@/components/display/DisplayTrendingCollections";

// import utility
import { GetAllCategory, GetAllCollection, GetAllProducts } from "@/utility/fetcher";

export default async function Home() {
  const results = await Promise.allSettled([
    GetAllCollection(),
    GetAllCategory(),
    GetAllProducts()
  ]);
  
  // check the result of all promise
  const allCollection = results[0].status === "fulfilled" ? results[0].value : null;
  const allCategory = results[1].status === "fulfilled" ? results[1].value : null;
  const allProducts = results[2].status === "fulfilled" ? results[2].value : null;  

  return (
      <MainWrapper>
        <PageContent>
          <HomeCarousel />
          <DisplayTrendingCollections initialData={allCollection} />
          <CategoryCarousel initialData={allCategory} />
          <DisplayAllProduct initialData={allProducts} />
        </PageContent>
      </MainWrapper>
  );
}

import React from "react";

import getCategory from "@/actions/getCategory";
import getDesigners from "@/actions/getDesigners";
import getProducts from "@/actions/getProducts";
import getSizes from "@/actions/getSizes";
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import Filter from "./components/Filter";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";
import MobileFilters from "./components/MobileFilters";

export const revalidate = 60;

type Props = {
  params: {
    categoryId: string;
  };
  searchParams: {
    designerId: string;
    sizeId: string;
  };
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const products = await getProducts({
    categoryId: params.categoryId,
    designerId: searchParams.designerId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const designers = await getDesigners();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} designers={designers} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="designerId" name="designers" data={designers} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(product => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

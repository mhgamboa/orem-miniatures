import React from "react";
import type { Metadata } from "next";

import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import Container from "@/components/ui/Container";
import ProductList from "@/components/ProductList";
import Gallery from "@/components/gallery/Index";
import Info from "@/components/Info";

type Props = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await getProduct(params.productId);

  return {
    title: `${product.name} - Orem Miniatures`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({ categoryId: product.category.id });

  return (
    <div>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList items={suggestedProducts} title="Related Products" />
        </div>
      </Container>
    </div>
  );
}

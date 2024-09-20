import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

type Query = {
  categoryId?: string;
  designerId?: string;
  sizeId?: string;
  isFeatured?: boolean;
};

export default async function getProducts(query: Query) {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      designerId: query.designerId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Product[]>;
}

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function getProduct(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Product>;
}

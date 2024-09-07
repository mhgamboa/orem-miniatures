import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategories() {
  const res = await fetch(URL, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Category[]>;
  // return [];
}

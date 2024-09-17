import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategory(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Category>;
}

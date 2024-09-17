import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export default async function getSizes() {
  const res = await fetch(URL, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Size[]>;
  // return [];
}

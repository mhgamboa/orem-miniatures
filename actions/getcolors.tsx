import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export default async function getColors() {
  const res = await fetch(URL, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Color[]>;
  // return [];
}

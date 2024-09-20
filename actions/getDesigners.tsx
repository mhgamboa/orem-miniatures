import { Designer } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/designers`;

export default async function getDesigners() {
  const res = await fetch(URL, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Designer[]>;
  // return [];
}

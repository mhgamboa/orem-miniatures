import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export default async function getBillboard(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    next: { revalidate: 60 },
  });

  return res.json() as Promise<Billboard>;
}

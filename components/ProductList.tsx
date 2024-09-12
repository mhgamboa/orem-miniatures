import { Product } from "@/types";
import NoResults from "@/components/ui/NoResults";

type Props = {
  title: string;
  items: Product[];
};

export default function ProductList({ title, items }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      {items.length === 0 && <NoResults />}
    </div>
  );
}

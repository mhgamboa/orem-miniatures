"use client";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Designer, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React from "react";

type Props = {
  data: (Size | Designer)[];
  name: string;
  valueKey: string;
};

export default function Filter({ data, name, valueKey }: Props) {
  const SearchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = SearchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(SearchParams.toString());
    const query = {
      ...current,
      [valueKey]: id,
    };
    if (current[valueKey] === id) query[valueKey] = null;

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map(filter => {
          return (
            <div key={filter.id} className="flex items-center">
              <Button
                className={cn(
                  "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                  selectedValue === filter.id && "bg-black text-white"
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { formatter } from "@/lib/utils";

type Props = {
  value?: string | number;
};

export default function Currency({ value }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
}

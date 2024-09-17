"use client";
import React from "react";
import Image from "next/image";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { Image as ImageType } from "@/types";

import GalleryTab from "./GalleryTab";

type Props = {
  images: ImageType[];
};

export default function Index({ images }: Props) {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map(image => {
            return <GalleryTab key={image.id} image={image} />;
          })}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full">
        {images.map(image => {
          return (
            <TabPanel key={image.id}>
              <div className="aspect-square relative w-full h-full sm:rounded-lg overflow-hidden">
                <Image fill alt="Product" src={image.url} className="object-cover object-center" />
              </div>
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
}

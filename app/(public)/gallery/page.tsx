import * as React from 'react';
import GalleryComp from "@/components/public/gallery"

export interface IGalleryPageProps {
}

export default function GalleryPage (props: IGalleryPageProps) {
  return (
    <div>
      <GalleryComp/>
    </div>
  );
}

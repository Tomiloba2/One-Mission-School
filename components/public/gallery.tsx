"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Instagram, Facebook } from "lucide-react";

const galleryImages = [
  { id: 1, src: "/images/learing.jpg", alt: "Interactive classroom session", category: "Learning" },
  { id: 2, src: "/images/creche2.jpg", alt: "Interactive classroom session", category: "Learning" },
  { id: 3, src: "/images/playground3.jpg", alt: "Students enjoying the playground", category: "Recreation" },
  { id: 4, src: "/images/playground.jpg", alt: "Students enjoying the playground", category: "Recreation" },
  { id: 5, src: "/images/assembly.jpg", alt: "Morning assembly", category: "School Life" },
  { id: 6, src: "/images/interhouse.jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 7, src: "/images/interhouse2.jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 8, src: "/images/interhouse3.jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 9, src: "/images/interhouse(4).jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 10, src: "/images/interhouse (5).jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 11, src: "/images/interhouse (6).jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 12, src: "/images/interhouse (7).jpg", alt: "Inter-house sports competition", category: "Sports" },
  { id: 13, src: "/images/arts.jpg", alt: "Creative arts class", category: "Arts" },
  { id: 14, src: "/images/arts (2).jpg", alt: "Creative arts class", category: "Arts" },
  { id: 15, src: "/images/arts (3).jpg", alt: "Creative arts class", category: "Arts" },
  { id: 16, src: "/images/arts (4).jpg", alt: "Creative arts class", category: "Arts" },
  { id: 17, src: "/images/arts (5).jpg", alt: "Creative arts class", category: "Arts" },
  { id: 18, src: "/images/arts (6).jpg", alt: "Creative arts class", category: "Arts" },
  { id: 19, src: "/images/arts (7).jpg", alt: "Creative arts class", category: "Arts" },
  { id: 20, src: "/images/career.jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 21, src: "/images/career1.jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 22, src: "/images/career2.jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 23, src: "/images/career3.jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 24, src: "/images/career4.jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 25, src: "/images/career (2).jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 26, src: "/images/career (3).jpg", alt: "Career day celebration", category: "Career Day" },
  { id: 27, src: "/images/color.jpg", alt: "Color day celebration", category: "Color Day" },
  { id: 28, src: "/images/color (3).jpg", alt: "Color day celebration", category: "Color Day" },
  { id: 29, src: "/images/color1.jpg", alt: "Color day celebration", category: "Color Day" },
  { id: 30, src: "/images/color2.jpg", alt: "Color day celebration", category: "Color Day" },
  { id: 31, src: "/images/color3.jpg", alt: "Color day celebration", category: "Color Day" },
  { id: 32, src: "/images/color (2).jpg", alt: "Color day celebration", category: "Color Day" },
  { id: 33, src: "/images/cultural.jpg", alt: "Cultural day celebration", category: "Culture" },
  { id: 34, src: "/images/cultural (2).jpg", alt: "Cultural day celebration", category: "Culture" },
  { id: 35, src: "/images/cultural1.jpg", alt: "Cultural day celebration", category: "Culture" },
  { id: 36, src: "/images/cultural2.jpg", alt: "Cultural day celebration", category: "Culture" },
  // Add more images…
];

export default function GalleryComp() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);

  const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
  const prevImage = () => {
    if (currentIndex > 0) setSelectedImage(galleryImages[currentIndex - 1].id);
  };
  const nextImage = () => {
    if (currentIndex < galleryImages.length - 1) setSelectedImage(galleryImages[currentIndex + 1].id);
  };

  const selected = galleryImages.find(img => img.id === selectedImage);

  return (
    <div>
      {/* Header */}
      <section className="bg-linear-to-br from-teal-100 via-indigo-100 to-transparent py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            School Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Capturing moments of learning, joy, creativity, and growth
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid group cursor-pointer relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(image.id)}
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading={'lazy'}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to see more? Follow us on social media!
            </p>
            <div className="flex justify-center gap-6">
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                  <span>
                    <Instagram className='h-20 w-20 mx-auto border-rose-500 text-rose-500' />
                  </span>

                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                  <span>
                    <Facebook className='h-20 w-20 mx-auto border-blue-500 text-blue-500' />
                  </span>

                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogTitle className="text-xl font-bold tracking-tight mb-2">{selected?.alt}</DialogTitle>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative">
            {selected && (
              <>
                <div className="relative aspect-4/3 md:aspect-video max-h-[85vh]">
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={prevImage}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="h-10 w-10" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={nextImage}
                    disabled={currentIndex === galleryImages.length - 1}
                  >
                    <ChevronRight className="h-10 w-10" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-8 w-8" />
                </Button>

                <div className="absolute bottom-6 left-0 right-0 text-center text-white text-lg font-medium px-6">
                  {selected.alt}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

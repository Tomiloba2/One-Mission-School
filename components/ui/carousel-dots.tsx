// app/components/ui/carousel-dots.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CarouselApi } from "@/components/ui/carousel";

interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CarouselDots({ className, ...props }: CarouselDotsProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (count <= 1) return null;

    return (
        <div
            className={cn("flex items-center justify-center gap-3", className)}
            {...props}
        >
            {Array.from({ length: count }).map((_, i) => (
                <button
                    key={i}
                    className={cn(
                        "h-3 w-3 rounded-full transition-all duration-300",
                        current === i + 1
                            ? "bg-white scale-125 shadow-lg"
                            : "bg-white/50 hover:bg-white/80"
                    )}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
    );
}
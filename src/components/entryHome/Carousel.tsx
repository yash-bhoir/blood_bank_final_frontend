import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import your images
const images = [
  "/src/assets/undraw_accept_request.svg",
  "/src/assets/undraw_completed.svg",
  "/src/assets/undraw_delivery_re_f50b.svg",
  "/src/assets/undraw_drone_delivery.svg",
];

export function CarouselDemo() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalImages = images.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 
  const goToNext = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalImages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex - 1 + totalImages) % totalImages);
  };

  useEffect(() => {
    // Start the autoplay
    intervalRef.current = setInterval(goToNext, 3000); // Change slides every 3 seconds

    return () => {
      // Clear interval on component unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden h-[85vh]">
      <Carousel className="w-full h-full">
        <CarouselContent
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-full h-full">
              <div className="p-1">
                <Card className="w-full h-full">
                  <CardContent className="flex items-center justify-center w-full h-full p-6">
                    <img
                      src={image}
                      alt={`Carousel image ${index + 1}`}
                      className="object-contain" // Change to object-contain
                      style={{ width: "550px", height: "450px" }} // Fixed dimensions
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={goToPrevious} />
        <CarouselNext onClick={goToNext} />
      </Carousel>
    </div>
  );
}

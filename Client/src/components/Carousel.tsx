import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";// Предполагая, что компонент Carousel предоставлен shadcn/ui

const carouselProducts = [
  {
    id: 1,
    name: "Acme Circles T-Shirt",
    price: "$20.00 USD",
    imageUrl: "woll.jpeg",
    link: "https://demo.vercel.store/product/acme-geometric-circles-tshirt"
  },
  {
    id: 2,
    name: "Acme Drawstring Bag",
    price: "$12.00 USD",
    imageUrl: "woll.jpeg",
    link: "https://demo.vercel.store/product/acme-drawstring-bag"
  },
  {
    id: 3,
    name: "Acme Cup",
    price: "$15.00 USD",
    imageUrl: "woll.jpeg",
    link: "https://demo.vercel.store/product/acme-cup"
  },
  // Дополнительные элементы карусели
];

export default function ProductCarousel() {

  return (
    <Carousel className="container py-20 sm:py-32">
      <CarouselContent className="">
        {carouselProducts.map(product => (
          <CarouselItem key={product.id} className="l-1 md:basis-1/2 lg:basis-1/3">
            <div className=" h-full">
              <Card>
                <CardContent className="flex-col flex aspect-square items-center justify-center p-6">
                  <img src={product.imageUrl} alt={product.name} className="h-auto" />
                  <div className="text-center">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <a href={product.link} className="text-blue-500 hover:underline">View Details</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
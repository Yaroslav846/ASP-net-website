import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
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
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

    <Carousel>
      <CarouselContent>
        {carouselProducts.map(product => (
          <CarouselItem key={product.id} className="l-1 md:basis-1/2 lg:basis-1/3">
            <div className=" h-full">
              <Card>
                <CardContent className="flex-col flex items-center justify-center p-0">
                  <img src={product.imageUrl} alt={product.name} className="rounded-lg" />
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
      {/* <CarouselPrevious className="hidden sm:block"/>
      <CarouselNext className="hidden sm:block"/> */}
    </Carousel>
    </section>
  )
}
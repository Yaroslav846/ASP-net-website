import { Button } from "./ui/button";
// import { HeroCards } from "./HeroCards";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            Кухни вашей мечты
          </h1>{" "}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Бесплатно составим 3D модель кухни с полным расчетом стоимости уже на следующий день
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Get Started</Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        {/* <HeroCards /> */}
        <img className="" src="image1.png" alt="" />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};

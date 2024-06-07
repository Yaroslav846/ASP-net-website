import { Button } from "./ui/button";
import Quiz from "./Quiz"
import { useState } from "react";

export const Cta = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleButtonClick = () => {
    setShowQuiz(true);
  };
  
  return (
    <section
      id="cta"
      className="container bg-muted/50 py-16 my-24 sm:my-32"
    >
      {showQuiz ? (
        <div className="animate-fadeIn">
          <Quiz />
        </div>
      ) : (
      <div className="lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            All Your
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Ideas & Concepts{" "}
            </span>
            In One Interface
          </h2>
          <p className="text-muted-foreground text-xl mt-4 lg:mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
            sed!
          </p>
          <div className="mt-4 space-y-4 lg:col-start-2">
            <Button className="w-full md:w-auto" onClick={handleButtonClick}>Request a Demo</Button>
            </div>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <img className="" src="image1.png" alt="" />
        </div>
      </div>
      )}
    </section>
  );
};

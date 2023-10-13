import { Requests } from "./api";

const messAround = async () => {
  // Write your test code in this function
  const testDog = {
    name: "Test Dog",
    image: "/assets/blue-heeler.png",
    description: "This is my test dog for post.",
    isFavorite: false,
  };

  const response = await Requests.updateDog(1, true);
  console.log(response, testDog);
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};

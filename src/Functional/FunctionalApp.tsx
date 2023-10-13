import React, { useState, useEffect } from "react";
import { Dog } from "../types";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";

// import { useState, useEffect } from "react";
// import { Dog } from "../types";
// import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
// import { FunctionalDogs } from "./FunctionalDogs";
// import { FunctionalSection } from "./FunctionalSection";
// import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayDogCategory, setDisplayDogCategory] = useState<string>("all");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const dogs: Dog[] = await Requests.getAllDogs();
      setAllDogs(dogs);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTrashIconClick = async (dogId: number) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(dogId);
      fetchData();
    } catch (error) {
      console.error("Error deleting dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeartClick = async (dogId: number) => {
    await toggleFavorite(dogId, false);
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    await toggleFavorite(dogId, true);
  };

  const toggleFavorite = async (dogId: number, isFavorite: boolean) => {
    setIsLoading(true);
    try {
      await Requests.updateDog(dogId, isFavorite);
      fetchData();
    } catch (error) {
      console.error("Error updating dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostDog = async (dog: Partial<Dog>): Promise<Dog | undefined> => {
    try {
      setIsLoading(true);
      await Requests.postDog(dog);
      await fetchData();
    } catch (error) {
      console.error("Error posting dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDogsByArg = (dogs: Dog[], arg: string): Dog[] => {
    const filterConditions: Record<string, (dog: Dog) => boolean> = {
      all: () => true,
      favorite: (dog) => dog.isFavorite === true,
      unfavorite: (dog) => dog.isFavorite === false,
      createDog: () => false,
    };

    if (arg in filterConditions) {
      return dogs.filter(filterConditions[arg]);
    }

    throw new Error(
      "Invalid argument value. Expected 'all', 'favorite', 'unfavorite', or 'createDog'."
    );
  };

  const filteredDogs: Dog[] = filterDogsByArg(allDogs, displayDogCategory);
  const favoriteDogCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteDogCount = allDogs.filter((dog) => !dog.isFavorite).length;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setDisplayDogType={setDisplayDogCategory}
        favoriteDogCount={favoriteDogCount}
        unfavoriteDogCount={unfavoriteDogCount}
      >
        {displayDogCategory === "createDog" ? (
          <FunctionalCreateDogForm
            handlePostDog={handlePostDog}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            handleTrashIconClick={handleTrashIconClick}
            handleHeartClick={handleHeartClick}
            handleEmptyHeartClick={handleEmptyHeartClick}
            isLoading={isLoading}
            allDogs={filteredDogs}
          />
        )}
      </FunctionalSection>
    </div>
  );
}

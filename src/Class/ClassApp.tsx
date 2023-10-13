// import React, { Component } from "react";
// import { ClassSection } from "./ClassSection";
// import { ClassDogs } from "./ClassDogs";
// import { ClassCreateDogForm } from "./ClassCreateDogForm";
// import { Dog } from "../types";
// import { Requests } from "../api";

// interface ClassAppState {
//   allDogs: Dog[];
//   isLoading: boolean;
//   displayDogType: string;
// }

// class ClassApp extends Component<{}, ClassAppState> {
//   state: ClassAppState = {
//     allDogs: [],
//     isLoading: false,
//     displayDogType: "all",
//   };

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const dogs: Dog[] = await Requests.getAllDogs();
//       this.setState({ allDogs: dogs });
//     } catch (error) {
//       console.error("Error fetching dogs:", error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleTrashIconClick = async (dogId: number) => {
//     this.setState({ isLoading: true });
//     try {
//       await Requests.deleteDog(dogId);
//       this.fetchData();
//     } catch (error) {
//       console.error("Error deleting dog:", error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleHeartClick = async (dogId: number) => {
//     await this.toggleFavorite(dogId, false);
//   };

//   handleEmptyHeartClick = async (dogId: number) => {
//     await this.toggleFavorite(dogId, true);
//   };

//   toggleFavorite = async (dogId: number, isFavorite: boolean) => {
//     this.setState({ isLoading: true });
//     try {
//       await Requests.updateDog(dogId, isFavorite);
//       this.fetchData();
//     } catch (error) {
//       console.error("Error updating dog:", error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handlePostDog = async (dog: Partial<Dog>): Promise<Dog | undefined> => {
//     this.setState({ isLoading: true });
//     try {
//       await Requests.postDog(dog);
//       this.fetchData();
//     } catch (error) {
//       console.error("Error posting dog:", error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   filterDogsByArg = (dogs: Dog[], arg: string): Dog[] => {
//     const filterConditions: Record<string, (dog: Dog) => boolean> = {
//       all: () => true,
//       favorite: (dog) => dog.isFavorite === true,
//       unfavorite: (dog) => dog.isFavorite === false,
//       createDog: () => false,
//     };

//     if (arg in filterConditions) {
//       return dogs.filter(filterConditions[arg]);
//     }

//     throw new Error(
//       "Invalid argument value. Expected 'all', 'favorite', 'unfavorite', or 'createDog'."
//     );
//   };

//   render() {
//     const { allDogs, isLoading, displayDogType } = this.state;

//     const filteredDogs = this.filterDogsByArg(allDogs, displayDogType);
//     const favoriteDogCount = allDogs.filter((dog) => dog.isFavorite).length;
//     const unfavoriteDogCount = allDogs.filter((dog) => !dog.isFavorite).length;

//     return (
//       <div className="App" style={{ backgroundColor: "goldenrod" }}>
//         <header>
//           <h1>pup-e-picker (Class Version)</h1>
//         </header>
//         <ClassSection
//           setDisplayDogType={(type) => this.setState({ displayDogType: type })}
//           favoriteDogCount={favoriteDogCount}
//           unfavoriteDogCount={unfavoriteDogCount}
//         >
//           {displayDogType === "createDog" ? (
//             <ClassCreateDogForm
//               handlePostDog={this.handlePostDog}
//               isLoading={isLoading}
//             />
//           ) : (
//             <ClassDogs
//               handleTrashIconClick={this.handleTrashIconClick}
//               handleHeartClick={this.handleHeartClick}
//               handleEmptyHeartClick={this.handleEmptyHeartClick}
//               isLoading={isLoading}
//               allDogs={filteredDogs}
//             />
//           )}
//         </ClassSection>
//       </div>
//     );
//   }
// }

// export default ClassApp;

import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassAppState {
  allDogs: Dog[];
  isLoading: boolean;
  displayDogType: string;
}

export class ClassApp extends Component<ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    isLoading: false,
    displayDogType: "all",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const dogs: Dog[] = await Requests.getAllDogs();
      this.setState({ allDogs: dogs });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleTrashIconClick = async (dogId: number) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(dogId);
      this.fetchData();
    } catch (error) {
      console.error("Error deleting dog:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleHeartClick = async (dogId: number) => {
    await this.toggleFavorite(dogId, false);
  };

  handleEmptyHeartClick = async (dogId: number) => {
    await this.toggleFavorite(dogId, true);
  };

  toggleFavorite = async (dogId: number, isFavorite: boolean) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog(dogId, isFavorite);
      this.fetchData();
    } catch (error) {
      console.error("Error updating dog:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePostDog = async (dog: Partial<Dog>): Promise<Dog | undefined> => {
    this.setState({ isLoading: true });
    try {
      await Requests.postDog(dog);
      this.fetchData();
    } catch (error) {
      console.error("Error posting dog:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  filterDogsByArg = (dogs: Dog[], arg: string): Dog[] => {
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

  render() {
    const { allDogs, isLoading, displayDogType } = this.state;

    const filteredDogs = this.filterDogsByArg(allDogs, displayDogType);
    const favoriteDogCount = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavoriteDogCount = allDogs.filter((dog) => !dog.isFavorite).length;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          setDisplayDogType={(type) => this.setState({ displayDogType: type })}
          favoriteDogCount={favoriteDogCount}
          unfavoriteDogCount={unfavoriteDogCount}
        >
          {displayDogType === "createDog" ? (
            <ClassCreateDogForm
              handlePostDog={this.handlePostDog}
              isLoading={isLoading}
            />
          ) : (
            <ClassDogs
              handleTrashIconClick={this.handleTrashIconClick}
              handleHeartClick={this.handleHeartClick}
              handleEmptyHeartClick={this.handleEmptyHeartClick}
              isLoading={isLoading}
              allDogs={filteredDogs}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}

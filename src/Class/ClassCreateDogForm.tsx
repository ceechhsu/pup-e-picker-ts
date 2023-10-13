import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface ClassCreateDogFormProps {
  handlePostDog: (dog: Partial<Dog>) => Promise<Dog | undefined>;
  isLoading: boolean;
}

interface ClassCreateDogFormState {
  formData: {
    name: string;
    image: string;
    description: string;
    isFavorite: boolean;
  };
}

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state = {
    formData: {
      name: "",
      image: defaultSelectedImage,
      description: "",
      isFavorite: false,
    },
  };

  clearFormData = () => {
    this.setState({
      formData: {
        name: "",
        image: dogPictures.BlueHeeler,
        description: "",
        isFavorite: false,
      },
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        image: value,
      },
    }));
  };

  handleOnSubmit = () => {
    this.props.handlePostDog(this.state.formData);
    this.clearFormData();
  };

  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleOnSubmit();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={this.state.formData.name}
          onChange={this.handleInputChange}
          disabled={this.props.isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id=""
          value={this.state.formData.description}
          cols={80}
          rows={10}
          onChange={this.handleTextareaChange}
          disabled={this.props.isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={this.handleSelectChange}
          value={this.state.formData.image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" disabled={this.props.isLoading} />
      </form>
    );
  }
}

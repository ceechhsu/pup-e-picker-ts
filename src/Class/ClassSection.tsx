// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ClassSectionProps {
  children: ReactNode;
  setDisplayDogType: (value: string) => void;
  favoriteDogCount: number;
  unfavoriteDogCount: number;
}

export class ClassSection extends Component<ClassSectionProps> {
  state = {
    activeDiv: "",
  };

  handleActiveDiv = (arg: string) => {
    if (arg === this.state.activeDiv) {
      this.setState({ activeDiv: "" });
      this.props.setDisplayDogType("all");
    } else {
      this.setState({ activeDiv: arg });
      this.props.setDisplayDogType(arg);
    }
  };

  render() {
    const { children, favoriteDogCount, unfavoriteDogCount } = this.props;
    const { activeDiv } = this.state;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Functional Version
          </Link>
          <Link to={"/"} className="btn">
            Home
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${activeDiv === "favorite" ? "active" : ""}`}
              onClick={() => {
                this.handleActiveDiv("favorite");
              }}
            >
              favorited ( {favoriteDogCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeDiv === "unfavorite" ? "active" : ""
              }`}
              onClick={() => {
                this.handleActiveDiv("unfavorite");
              }}
            >
              unfavorited ( {unfavoriteDogCount} )
            </div>
            <div
              className={`selector ${
                activeDiv === "createDog" ? "active" : ""
              }`}
              onClick={() => {
                this.handleActiveDiv("createDog");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}

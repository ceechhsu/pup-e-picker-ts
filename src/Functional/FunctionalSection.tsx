import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface FunctionalSectionProps {
  children: ReactNode;
  setDisplayDogType: (value: string) => void;
  favoriteDogCount: number;
  unfavoriteDogCount: number;
}

const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  children,
  setDisplayDogType,
  favoriteDogCount,
  unfavoriteDogCount,
}) => {
  const [activeDiv, setActiveDiv] = useState<string>("");

  const handleActiveDiv = (arg: string) => {
    if (arg === activeDiv) {
      setActiveDiv("");
      setDisplayDogType("all");
    } else {
      setActiveDiv(arg);
      setDisplayDogType(arg);
    }
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to="/class" className="btn">
          Class Version
        </Link>
        <Link to="/" className="btn">
          Home
        </Link>
        <div className="selectors">
          <Selector
            label="favorited"
            activeDiv={activeDiv}
            onClick={() => handleActiveDiv("favorite")}
            count={favoriteDogCount}
          />
          <Selector
            label="unfavorited"
            activeDiv={activeDiv}
            onClick={() => handleActiveDiv("unfavorite")}
            count={unfavoriteDogCount}
          />
          <Selector
            label="create dog"
            activeDiv={activeDiv}
            onClick={() => handleActiveDiv("createDog")}
          />
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

interface SelectorProps {
  label: string;
  activeDiv: string;
  onClick: () => void;
  count?: number;
}

const Selector: React.FC<SelectorProps> = ({
  label,
  activeDiv,
  onClick,
  count,
}) => {
  const isActive =
    activeDiv.substring(0, 5) === label.substring(0, 5) ? "active" : "";
  return (
    <div className={`selector ${isActive}`} onClick={onClick}>
      {count ? `${label} ( ${count} )` : label}
    </div>
  );
};

export default FunctionalSection;

import * as React from "react";
import { IProjectDetailProps } from "../IProjectDetailProps";
import ProgressStyles from "./ProgressIndicator.module.scss";
import Styles from "../ProjectDetail.module.scss";
import { Label } from "office-ui-fabric-react";

interface ProgressIndicatorProps extends IProjectDetailProps {
  onHover: (description: string | null) => void;
}
interface ProgressDescriptionProps {
  description: string | null;
}
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  project,
  steps,
  onHover,
}) => {
  return (
    <>
      <ol className={ProgressStyles.progress}>
        {steps.map((item: any) => (
          <li
            key={item.id}
            className={`${
              item.Title === project.Faser.Title
                ? ProgressStyles.progress__step__active
                : ProgressStyles.progress__step
            }`}
            onMouseEnter={() => onHover(item.Description)} // Set description on hover
            onMouseLeave={() => onHover(null)} // Reset description on hover out
          >
            {item.Title}
          </li>
        ))}
      </ol>
      {/* Conditionally render the description label if a step is being hovered */}
      {/* 
      <Label styles={{ root: { color: "black" } }}>
        {hoveredStep || "Hover over a step to see the test"}
      </Label> */}
    </>
  );
};

export const ProgressDescription: React.FC<ProgressDescriptionProps> = ({
  description,
}) => {
  return (
    <div>
      <Label styles={{ root: { color: "white" } }}>
        {description || "Hover over a step to see the description"}
      </Label>
    </div>
  );
};
export const ProjectProgress: React.FC<IProjectDetailProps> = ({
  project,
  steps,
}) => {
  const selectedStep = steps.find(
    (step: any) => step.Title === project.Faser.Title
  );
  const initialDescription = selectedStep?.Description || "";
  // State to keep track of the hovered step description
  const [hoveredDescription, setHoveredDescription] = React.useState<
    string | null
  >(null);

  return (
    <>
      <h2 className={ProgressStyles.progressStep_title}>Progress steps</h2>
      <div className={Styles.progressIndicator}>
        {/* Pass down the hover handlers and hoveredDescription to both components */}
        <ProgressIndicator
          project={project}
          steps={steps}
          onHover={setHoveredDescription}
        />
      </div>
      <div className={Styles.progressDescription}>
        <ProgressDescription
          description={
            hoveredDescription !== null
              ? hoveredDescription
              : initialDescription
          }
        />
      </div>
    </>
  );
};

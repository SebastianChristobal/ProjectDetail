import * as React from "react";
import { IProjectDetailProps } from "../IProjectDetailProps";
import Styles from "./ProgressIndicator.module.scss";

export const ProgressIndicator: React.FC<IProjectDetailProps> = ({
  project,
  steps,
}) => {
  const step = project.Faser.Title;
  return (
    <>
      <h2 className={Styles.progressStep_title}>Progress steps</h2>
      <ol className={Styles.progress}>
        {steps.map((items: any) => {
          return (
            <li
              key={items.id}
              className={`${
                items.Title === step
                  ? Styles.progress__step__active
                  : Styles.progress__step
              }`}
            >
              {items.Title}
            </li>
          );
        })}
      </ol>
    </>
  );
};

/* <li>Initiate Project</li>
        <li className={styles.progress__step}>Execute Project Plan</li>
        <li
          className={`${styles.progress__step} ${}`}
        >
          Monitor Project Progress
        </li>
        <li className={styles.progress__step}>Perform Quality Assurance</li>
        <li className={styles.progress__step}>Close Project</li> */

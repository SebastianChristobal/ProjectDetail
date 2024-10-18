import * as React from "react";
import { IProjectDetailProps } from "../IProjectDetailProps";
import { PrimaryButton } from "@fluentui/react/lib/Button";

export const Button: React.FC<IProjectDetailProps> = ({
  children,
  ...props
}) => {
  return <PrimaryButton {...props}>{children}</PrimaryButton>;
};

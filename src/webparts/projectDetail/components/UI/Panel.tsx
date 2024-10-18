import * as React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { IProjectDetailProps } from "../IProjectDetailProps";

const buttonStyles = { root: { marginRight: 8 } };

export const EditPanel: React.FC<IProjectDetailProps> = ({
  edit,
  onClose,
  children,
}) => {
  const dismissPanel = React.useCallback((): void => {
    onClose();
  }, []);

  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel]
  );
  return (
    <>
      <Panel
        headerText="Edit Project"
        isOpen={edit}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
        type={PanelType.medium}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
      >
        <p>{children}</p>
      </Panel>
    </>
  );
};

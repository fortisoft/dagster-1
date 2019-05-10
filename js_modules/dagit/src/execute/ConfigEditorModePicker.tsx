import * as React from "react";
import { Button, Menu, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { PipelineExecutionContainerFragment } from "./types/PipelineExecutionContainerFragment";

interface ConfigEditorModePickerProps {
  pipeline: PipelineExecutionContainerFragment;
  modeName: string | null;
  onModeChange: (mode: string) => void;
}

interface Mode {
  name: string;
}

const ModeSelect = Select.ofType<Mode>();

export default class ConfigEditorModePicker extends React.Component<
  ConfigEditorModePickerProps
> {
  render() {
    const currentMode = this.props.modeName
      ? this.props.pipeline.modes.find(m => m.name == this.props.modeName)
      : null;

    return (
      <div>
        <ModeSelect
          activeItem={currentMode}
          filterable={true}
          items={this.props.pipeline.modes}
          itemPredicate={(query, mode) =>
            query.length === 0 || mode.name.includes(query)
          }
          itemRenderer={(mode, props) => (
            <Menu.Item
              active={props.modifiers.active}
              key={mode.name}
              text={mode.name}
              onClick={props.handleClick}
            />
          )}
          onItemSelect={this.onItemSelect}
        >
          <Button
            text={currentMode ? "Mode: " + currentMode.name : "Select Mode"}
            icon="insert"
            rightIcon="caret-down"
          />
        </ModeSelect>
      </div>
    );
  }

  private onItemSelect = (mode: Mode) => {
    this.props.onModeChange(mode.name);
  };
}

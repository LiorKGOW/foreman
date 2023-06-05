import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import EditorSettings from '../EditorSettings';
import {
  inputEditorContextValue,
  previewEditorContextValue,
} from '../../Editor.fixtures';
import { EditorContext } from '../../EditorContext';
import { editorSettingsFixtures } from '../../Editor.fixtures';

describe('EditorSettings', () => {
  it('should render all elements in preview view', async () => {
    const { getByText, getByLabelText, getAllByLabelText } = await render(
      <EditorContext.Provider value={previewEditorContextValue}>
        <EditorSettings {...editorSettingsFixtures} />
      </EditorContext.Provider>
    );

    const editorSettingsOpenbutton = getAllByLabelText(/EditorSettings button/i)[1];
    
    // Open EdtiorSettings
    fireEvent.click(editorSettingsOpenbutton);

    // another try:
    // const editorSettingsOpenbuttoncontainer = getByLabelText(/EditorSettings button container/i);
    // const editorSettingsOpenbutton2 = editorSettingsOpenbuttoncontainer.children[0].children[0];
    // fireEvent.click(editorSettingsOpenbutton2);


    // // Titles
    // expect(getByText(/Settings/i)).toBeInTheDocument();
    // expect(getByText(/Syntax/i)).toBeInTheDocument();
    // expect(getByText(/Keybind/i)).toBeInTheDocument();
    // expect(getByText(/Theme/i)).toBeInTheDocument();
    // expect(getByText(/Autocompletion/i)).toBeInTheDocument();
    // expect(getByText(/Live Autocompletion/i)).toBeInTheDocument();

    // DropDowns
    const modeDropdown = getByLabelText(/Mode Dropdown/i);
    const keybindingsDropdown = getByLabelText(/Keybindings Dropdown/i);
    const themesDropdown = getByLabelText(/Themes Dropdown/i);

    // Should be disabled in preview view
    expect(modeDropdown).toBeDisabled();
    expect(keybindingsDropdown).toBeDisabled();

    expect(themesDropdown).not.toBeDisabled();

    // autocompletion
    expect(getByLabelText(/autocompletion input/i).toBeInTheDocument());
  });

  it('should render mode & keybindings dropdowns in input view as not disabled', () => {
    const { getByText, getByLabelText } = render(
      <EditorContext.Provider value={previewEditorContextValue}>
        <EditorSettings {...editorSettingsFixtures} />
      </EditorContext.Provider>
    );

    const modeDropdown = getByLabelText(/Mode Dropdown/i);
    const keybindingsDropdown = getByLabelText(/Keybindings Dropdown/i);

    // Should be not disabled in input view
    expect(modeDropdown).not.toBeDisabled();
    expect(keybindingsDropdown).not.toBeDisabled();
    });
});

// describe('EditorSettings', () => {
//   it('should render with input view', () => {
//     const wrapper = shallow(
//       <EditorContext.Provider value={{inputSelectedView}}>
//         <EditorSettings {...editorSettingsFixtures} />
//       </EditorContext.Provider>
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('should render with preview view', () => {
//     const wrapper = shallow(
//       <EditorContext.Provider value={{previewSelectedView}}>
//         <EditorSettings {...editorSettingsFixtures} />
//       </EditorContext.Provider>
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
// });

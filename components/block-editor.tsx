"use client"
import { useState } from "react";
import { BlocklyWorkspace } from 'react-blockly';
import Blockly from "blockly";

export const BlockEditor = () => {
    
    const [xml, setXml] = useState("");
    //const [javascriptCode, setJavascriptCode] = useState("");

    const initialXml =
      '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Logic",
            colour: "#5C81A6",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
              {
                kind: "block",
                type: "logic_compare",
              },
            ],
          },
          {
            kind: "category",
            name: "Math",
            colour: "#5CA65C",
            contents: [
              {
                kind: "block",
                type: "math_round",
              },
              {
                kind: "block",
                type: "math_number",
              },
            ],
          },
          {
            kind: "category",
            name: "Custom",
            colour: "#5CA699",
            contents: [
              {
                kind: "block",
                type: "new_boundary_function",
              },
              {
                kind: "block",
                type: "return",
              },
            ],
          },
        ],
      };

    // function workspaceDidChange(workspace) {
    // const code = Blockly.JavaScript.workspaceToCode(workspace);
    // setJavascriptCode(code);
    // }

    return (
        <>
        <BlocklyWorkspace
        className="h-full" // you can use whatever classes are appropriate for your app's CSS
        toolboxConfiguration={toolboxCategories} // this must be a JSON toolbox definition
        initialXml={initialXml}
        onXmlChange={setXml}
        workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#432",
              snap: true,
            },
          }}
        //onWorkspaceChange={workspaceDidChange}
        />
        <pre id="generated-xml">{xml}</pre>
        {/* <textarea
            id="code"
            style={{ height: "200px", width: "400px" }}
            value={javascriptCode}
            readOnly
        ></textarea> */}
        </>
        )
}
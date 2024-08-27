import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor(props) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        if (props.currentEmailContent) {
            const contentState = ContentState.createFromText(props.currentEmailContent);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, [props.currentEmailContent]);

    return (
        <div className="App">
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
    )
}

export default TextEditor;
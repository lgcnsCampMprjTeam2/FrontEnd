import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CSAnswerEditor = ({ content, setContent }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(e, editor) => setContent(editor.getData())}
      />
    </div>
  );
};

export default CSAnswerEditor;

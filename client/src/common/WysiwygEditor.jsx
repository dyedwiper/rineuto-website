import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Bold, ClassicEditor, Essentials, Italic, Link, Paragraph, Strikethrough, Underline } from 'ckeditor5';
import React from 'react';

import 'ckeditor5/ckeditor5.css';

export default function WysiwygEditor({ setEditor, data }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      id="ckEditor"
      config={{
        licenseKey: 'GPL',
        plugins: [Essentials, Paragraph, Bold, Italic, Underline, Strikethrough, Link],
        toolbar: ['bold', 'italic', 'underline', 'strikethrough', '|', 'link'],
        link: {
          decorators: {
            openInNewTab: {
              mode: 'manual',
              label: 'Open in a new tab',
              attributes: {
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            },
          },
        },
        initialData: data,
      }}
      onReady={(editor) => {
        setEditor(editor);
      }}
    />
  );
}

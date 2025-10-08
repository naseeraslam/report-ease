import { Editor } from '@tinymce/tinymce-react';
import { useMemo } from 'react';
import { Language } from '../types/report.types';

interface Props {
    content: string;
    setContent: (value: string) => void;
    language: Language;
}

export default function RichEditor({ content, setContent, language }: Props) {
    const editorConfig = useMemo(() => ({
        height: 600,
        menubar: 'file edit view insert format tools table help',
        plugins: [
            'advlist autolink lists link charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table help wordcount emoticons codesample pagebreak',
            'directionality nonbreaking visualchars template autosave'
        ],
        toolbar: [
            'undo redo | styles | fontselect fontsizeselect |',
            'bold italic underline strikethrough forecolor backcolor |',
            'alignleft aligncenter alignright alignjustify |',
            'bullist numlist outdent indent | emoticons codesample |',
            'table template pagebreak nonbreaking visualchars |',
            'ltr rtl removeformat | fullscreen preview code help'
        ].join(' '),
        font_formats:
            'Arial=arial,helvetica,sans-serif;' +
            'Comic Sans MS=comic sans ms,sans-serif;' +
            'Courier New=courier new,courier;' +
            'Georgia=georgia,palatino;' +
            'Tahoma=tahoma,arial,helvetica,sans-serif;' +
            'Times New Roman=times new roman,times;' +
            'Verdana=verdana,geneva;' +
            'Noto Nastaliq Urdu=Noto Nastaliq Urdu,sans-serif;',
        fontsize_formats:
            '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt 48pt 60pt 72pt 96pt',
        image_advtab: false,
        automatic_uploads: false,
        file_picker_types: '',
        paste_data_images: false,
        directionality: (language === Language.Urdu ? 'rtl' : 'ltr') as 'rtl' | 'ltr',
        content_style: `
      body {
        font-family: ${language === Language.Urdu ? 'Noto Nastaliq Urdu, serif' : 'Arial, sans-serif'};
        font-size: 14px;
        line-height: 1.6;
      }
      table { border-collapse: collapse; width: 100%; }
      table, th, td { border: 1px solid #ccc; padding: 6px; }
      code { background-color: #f9f9f9; padding: 2px 4px; border-radius: 4px; }
    `,
        placeholder: 'Write your report here...',
        branding: false,
        resize: true,
        toolbar_mode: 'floating' as 'floating' | 'sliding' | 'wrap' | undefined, // ✅ fixed type
        contextmenu: 'link table',
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
        autosave_interval: '30s',
        autosave_retention: '2m',
        templates: [
            {
                title: 'Formal Report',
                description: 'Insert a formal report header',
                content: `<h2 style="text-align:center;">Report Title</h2>
                  <p><strong>Date:</strong> {{date}}</p>
                  <p><strong>Author:</strong> {{author}}</p>
                  <hr />
                  <p></p>`,
            },
            {
                title: 'Table Summary',
                description: 'Predefined 3-column table layout',
                content: `<table style="width:100%">
                    <tr><th>Item</th><th>Description</th><th>Remarks</th></tr>
                    <tr><td>1</td><td></td><td></td></tr>
                    <tr><td>2</td><td></td><td></td></tr>
                  </table>`,
            },
        ],
    }), [language]);

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Content</label>
            <Editor
                key={language}
                apiKey="myoemufv5noo1im6gw9yduo2p6tswualrytda4lo8yc2knax"
                value={content}
                onEditorChange={(newContent: string) => setContent(newContent)}
                init={editorConfig}
            />
        </div>
    );
}

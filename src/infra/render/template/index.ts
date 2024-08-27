import fs from "fs";
import path from "path";

type RendererData = Record<string, string>;

type FileCache = Record<string, string>;

export default class TemplateRenderer {
    templateFolderPath: string;

    private rawFileCache: FileCache = {};
    private replacedFileCache: FileCache = {};

    constructor (templateFolderPath: string) {
        this.templateFolderPath = templateFolderPath;
    }

    private replaceData(content: string, data: RendererData): string {
        let newContent = content;
        Object.keys(data).forEach((key) => {
            newContent = newContent.replace(`{{${key}}}`, data[key]);
        });
        return newContent;
    }

    private readFile(fileName: string): string {
        let fileContent = this.rawFileCache[fileName];
        if (fileContent === undefined) {
            const filePath = path.join(this.templateFolderPath, `${fileName}.html`);
            fileContent = fs.readFileSync(filePath, 'utf-8');
            this.rawFileCache[fileName] = fileContent;
        }
        return fileContent
    }

    private replaceFiles(content: string): string {
        const fileRegex = /{{files\.([a-zA-Z0-9-_]+)}}/g;
    
        let newContent = content;
        let match = fileRegex.exec(content);
        while (match !== null) {
            const fileContent = this.readFile(match[1]);
    
            newContent = newContent.replace(match[0], fileContent);
            
            fileRegex.lastIndex = 0;
            match = fileRegex.exec(newContent);
        }
        return newContent;
    }

    render (fileName: string, data?: RendererData): string {
        const fileNameWithoutExtension = fileName.split('.')[0];

        let replacedContent = this.replacedFileCache[fileNameWithoutExtension];
        if (replacedContent === undefined) {
            const fileContent = this.readFile(fileNameWithoutExtension);
            replacedContent = this.replaceFiles(fileContent);
            this.replacedFileCache[fileNameWithoutExtension] = replacedContent;
        }
        
        return this.replaceData(replacedContent, data ?? {});
    }
}


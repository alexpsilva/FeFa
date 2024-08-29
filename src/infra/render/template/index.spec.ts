import TemplateRenderer from "./";
import fs from "fs";

jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));
const fsMock = fs as jest.Mocked<typeof fs>;


describe('TemplateRenderer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    describe('constructor()', () => {
        it('should store the templateFolderPath', () => {
            const templateFolderPath = 'path/to/templates';
            const renderer = new TemplateRenderer(templateFolderPath);
            expect(renderer.templateFolderPath).toBe(templateFolderPath);
        })
    })

    describe('render()', () => {
        it('should read the file from the templateFolder and return its contents', () => {
            const templateFolderPath = 'path/to/templates';
            const fileName = 'test.html';
            const fileContents = 'test file contents';
            fsMock.readFileSync.mockReturnValue(fileContents);

            const result = (new TemplateRenderer(templateFolderPath)).render(fileName);

            expect(result).toBe(fileContents);
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/${fileName}`, 'utf-8');
        });

        it('should replace any occurence of {{key}} with the value of key in the data object', () => {
            const templateFolderPath = 'path/to/templates';
            const fileName = 'test.html';
            const fileContents = 'Hello {{name}} !';
            fsMock.readFileSync.mockReturnValue(fileContents);

            const result = (new TemplateRenderer(templateFolderPath)).render(fileName, { name: 'world' });

            expect(result).toBe('Hello world !');
        })

        it('should replace any occurence of {{files.name}} with the contents of the corresponding file in the templateFolder', () => {
            const templateFolderPath = 'path/to/templates';
            const fileName = 'test.html';
            const fileContents = 'Hello {{files.other-test}} !';
            fsMock.readFileSync.mockImplementation((filePath) => {
                if (filePath === `${templateFolderPath}/other-test.html`) {
                    return 'world';
                }
                return fileContents;
            });

            const result = (new TemplateRenderer(templateFolderPath)).render(fileName);

            expect(result).toBe('Hello world !');
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(2);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/test.html`, 'utf-8');
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/other-test.html`, 'utf-8');
        })

        it('should support nested {{files.name}} replacements', () => {
            const templateFolderPath = 'path/to/templates';
            const fileName = 'test.html';
            const fileContents = 'Hello {{files.other-test}}';
            fsMock.readFileSync.mockImplementation((filePath) => {
                if (filePath === `${templateFolderPath}/other-test.html`) {
                    return 'world {{files.other-other-test}}';
                }
                if (filePath === `${templateFolderPath}/other-other-test.html`) {
                    return '!!!';
                }
                return fileContents;
            });

            const result = (new TemplateRenderer(templateFolderPath)).render(fileName);

            expect(result).toBe('Hello world !!!');
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(3);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/test.html`, 'utf-8');
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/other-test.html`, 'utf-8');
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/other-other-test.html`, 'utf-8');
        })

        it.skip('should support nested folders in the templateFolder', () => {
            const templateFolderPath = 'path/to/templates';
            const fileName = 'test.html';
            const fileContents = 'Hello {{files.folder.other-test}} !';
            fsMock.readFileSync.mockImplementation((filePath) => {
                if (filePath === `${templateFolderPath}/folder/other-test.html`) {
                    return 'world';
                }
                return fileContents;
            });

            const result = (new TemplateRenderer(templateFolderPath)).render(fileName);

            expect(result).toBe('Hello world !');
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/test.html`, 'utf-8');
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(`${templateFolderPath}/folder/other-test.html`, 'utf-8');
        })

        it('should cache the file contents after reading it for the first time', () => {
            const templateFolderPath = 'path/to/templates';
            const fileName = 'test.html';
            const fileContents = 'Hello {{name}} !';
            fsMock.readFileSync.mockReturnValue(fileContents);

            const renderer = new TemplateRenderer(templateFolderPath);
            renderer.render(fileName, { name: 'world' });
            const result = renderer.render(fileName, { name: 'world' });

            expect(result).toBe('Hello world !');
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
        })
    })
})
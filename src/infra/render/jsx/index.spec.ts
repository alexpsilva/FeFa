import reactDOM from "react-dom/server";
jest.mock('react-dom/server', () => ({
    renderToStaticMarkup: jest.fn(),
}));
const reactDOMMock = reactDOM as jest.Mocked<typeof reactDOM>;

import streamScript from "./render_stream";
jest.mock('./render_stream');
const streamScriptMock = streamScript as jest.MockedFunction<typeof streamScript>;

import JSXRenderer from ".";

describe('JSXRenderer', () => {
    
    describe('render()', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        })

        it("should call react-dom's renderToStaticMarkup method", async () => {
            reactDOMMock.renderToStaticMarkup.mockReturnValue('html');
            const jsxMock = {} as JSX.Element
            
            const renderer = new JSXRenderer();
            const result = renderer.render(jsxMock);

            expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledWith(jsxMock);
            expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledTimes(1);
            expect(result).toBe('html');
        })

        it('should thrown an error if renderToStaticMarkup fails', async () => {
            reactDOMMock.renderToStaticMarkup.mockImplementation(() => { throw new Error('render failed') });
            const jsxMock = {} as JSX.Element
            
            const renderer = new JSXRenderer();
            expect(() => renderer.render(jsxMock)).toThrow('render failed');
        })
    })

    describe('renderStream()', () => {
        describe('when all elements are successfully rendered', () => {
            const initialJjsxMock = {key: 'initial'} as JSX.Element
            const scriptJsxMock = {key: 'script'} as JSX.Element;
            const streamedJsxMock1 = {key: 'streamed 1'} as JSX.Element
            const streamedJsxMock2 = {key: 'streamed 2'} as JSX.Element

            let result: Promise<string>[];

            beforeAll(() => {
                jest.resetAllMocks();
                reactDOMMock.renderToStaticMarkup.mockReturnValueOnce('initial html');
                reactDOMMock.renderToStaticMarkup.mockReturnValueOnce('script html');
                reactDOMMock.renderToStaticMarkup.mockReturnValueOnce('streamed html 1');
                reactDOMMock.renderToStaticMarkup.mockReturnValueOnce('streamed html 2');
                
                streamScriptMock.mockReturnValue(scriptJsxMock);
                
                const renderer = new JSXRenderer();
                result = renderer.renderStream(initialJjsxMock, Promise.resolve(streamedJsxMock1), Promise.resolve(streamedJsxMock2));
            })

            it('should syncronously render the initial element and the script element', async () => {
                expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledWith(initialJjsxMock);
                expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledWith(scriptJsxMock);

                expect(streamScriptMock).toHaveBeenCalledTimes(1);
                expect(streamScriptMock).toHaveBeenCalledWith();
            })
            
            it('should append a hidden open div to the initial element and return it', async () => {
                expect(await result[0]).toEqual('initial html<div id="content-source" style="display: none">');
            })
            
            it('should return the script element unchanged', async () => {
                expect(await result[1]).toEqual('script html');
            })

            it('should asyncronously render the streamed elements', async () => {
                expect(await result[2]).toEqual('streamed html 1');
                expect(await result[3]).toEqual('streamed html 2');
    
                expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledTimes(4);
                expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledWith(streamedJsxMock1);
                expect(reactDOMMock.renderToStaticMarkup).toHaveBeenCalledWith(streamedJsxMock2);
            })
        })
    })
})
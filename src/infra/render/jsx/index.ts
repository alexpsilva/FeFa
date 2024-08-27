import { renderToStaticMarkup } from "react-dom/server";
import RenderStreamScript from "./render_stream";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        ['stream-to']?: string;
    }
}

export default class JSXRenderer {
    render (jsx: JSX.Element): string {
        return renderToStaticMarkup(jsx);
    }

    renderStream(initialElement: JSX.Element, ...elementsToStream: Promise<JSX.Element>[]): Promise<string>[] {
        return [
            Promise.resolve(this.render(initialElement) + '<div id="content-source" style="display: none">'),
            Promise.resolve(this.render(RenderStreamScript())),
            ...elementsToStream.map(async element => this.render(await element))
        ];
    }
}


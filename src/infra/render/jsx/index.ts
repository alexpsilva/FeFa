import { renderToStaticMarkup } from "react-dom/server";
import RenderStreamScript from "./render_stream";
import JSXWithSlots from "./jsx_with_slots";

export default class JSXRenderer {
    private readonly contentSourceDiv = '<div id="content-source" style="display: none">';

    render (jsx: JSX.Element): string {
        return renderToStaticMarkup(jsx);
    }

    renderStream(elementWithSlots: JSXWithSlots): Promise<string>[] {
        return [
            Promise.resolve(this.render(elementWithSlots.loading()) + this.contentSourceDiv),
            Promise.resolve(this.render(RenderStreamScript())),
            ...elementWithSlots.resolveSlots().map(async element => {
                return this.render(await element)
            })
        ]
    }
}


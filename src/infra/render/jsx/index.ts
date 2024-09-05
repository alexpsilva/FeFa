import { renderToStaticMarkup } from "react-dom/server";
import RenderStreamScript from "./render_stream";
import { JSXWithSlotsInterface } from "./jsx_with_slots";
import Logger from "../../log";

type StripLogger<T extends Array<any>> = T extends [Logger, ...infer U] ? U : never;

export default class JSXRenderer {
    constructor(private readonly logger: Logger) {}

    private readonly contentSourceDiv = '<div id="content-source" style="display: none">';

    render (jsx: JSX.Element): string {
        return renderToStaticMarkup(jsx);
    }

    /**
     * Renders the provided JSX in parts and returns them in a array where:
     *  - The first element is the static part of the JSX, which can be rendered syncronously
     *  - The second element is a JS script that will move the dynamic parts of the JSX into their corresponding slots
     *  - The rest of the elements are the dynamic parts of the JSX, which are rendered asyncronously
     * @param jsxWithSlotsClass The class that extends JSXWithSlotsInterface
     * @param args The arguments to be passed to the class constructor (excluding the logger, which will be injected into the first argument)
     * @returns An array of promises that will resolve to the rendered JSX parts
    **/
    renderAsync<T extends new (logger: Logger, ...args: StripLogger<ConstructorParameters<T>>) => JSXWithSlotsInterface>(
        jsxWithSlotsClass: T,
        ...args: StripLogger<ConstructorParameters<T>>
    ): Promise<string>[] {
        const jsxWithSlots = new jsxWithSlotsClass(this.logger, ...args);

        return [
            Promise.resolve(this.render(jsxWithSlots.loading()) + this.contentSourceDiv),
            Promise.resolve(this.render(RenderStreamScript())),
            ...jsxWithSlots.resolveSlots().map(async element => {
                return this.render(await element)
            })
        ]
    }
}
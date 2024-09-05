import Logger from "../../log";

export interface JSXWithSlotsInterface {
    loading(): JSX.Element;
    resolveSlots(): Promise<JSX.Element>[];
}

type SlotContent = () => Promise<JSX.Element>
type SlotDetails = {
    loading?: JSX.Element,
    error?: JSX.Element,
    content: SlotContent,
};

export default abstract class JSXWithSlots implements JSXWithSlotsInterface {
    constructor(protected readonly logger: Logger) {}

    protected abstract slots: (SlotDetails | SlotContent)[]

    protected abstract shell(...filledSlots: JSX.Element[]): JSX.Element;

    private streamTargetWrapperId(index: number): string {
        return `stream-to-target-${index}`;
    }

    private streamTargetWrapper(index: number, children?: JSX.Element): JSX.Element {
        const id = this.streamTargetWrapperId(index);
        return <div id={id}>{children}</div>
    }

    private streamSourceWrapper(index: number, children: JSX.Element): JSX.Element {
        const streamTargetId = this.streamTargetWrapperId(index);
        return <div data-stream-to={streamTargetId}>{children}</div>
    }

    loading(): JSX.Element {
        return this.shell(...this.slots.map((slot, index) => this.streamTargetWrapper(
                index,
                'loading' in slot ? slot.loading : undefined,
            )
        ));
    }

    resolveSlots(): Promise<JSX.Element>[] {
        return this.slots.map(async (slot, index) => {
            const content = 'content' in slot ? slot.content : slot;

            try {
                return this.streamSourceWrapper(index, await content());
            } catch (error) {
                this.logger.error(error instanceof Error ? error.message : String(error));
                if ('error' in slot && slot.error) {
                    return this.streamSourceWrapper(index, slot.error);
                }

                throw error;
            }
        });
    }
}

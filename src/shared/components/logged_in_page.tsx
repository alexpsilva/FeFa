import { ReactNode } from "react";
import Menu from "./menu";
import Page from "./page";

export default function LoggedInPage({ title, head, children, ...props }: { 
    title: string, 
    head?: ReactNode, 
    children?: ReactNode,
}) {
    return (
        <Page title={title} head={head} className="flex-row">
            <Menu/>
            {children}
        </Page>
    )
}
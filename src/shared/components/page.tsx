import { HTMLAttributes, ReactNode } from "react";
import Head from "./head";

export default function Page({ title, head, children, ...props }: HTMLAttributes<HTMLBodyElement> & { 
    title: string, 
    head?: ReactNode, 
    children?: ReactNode,
}) {
    return (
        <html lang="pt-br">
            <Head title={title}>
                {head}
            </Head>
            <body {...props}>
                {children}
            </body>
        </html>
    )
}
import { ReactNode } from "react";
import Head from "./head";

export default function Page({ title, head, children, ...props }: React.ComponentProps<'body'> & { 
    title: string, 
    head?: ReactNode, 
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
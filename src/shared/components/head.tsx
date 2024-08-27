import { ReactNode } from "react";

export default function Head({ title, children }: { 
    title: string, 
    children?: ReactNode,
}) {
    return (
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>{title}</title>
            <link rel="stylesheet" href="/statics/global.css"/>
            {children}
        </head>
    )    
}
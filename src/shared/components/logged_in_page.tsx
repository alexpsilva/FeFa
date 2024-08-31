import Menu from "./menu";
import Page from "./page";

type PageProps = Pick<React.ComponentProps<typeof Page>, "title" | "head">;

export default function LoggedInPage({ title, head, children, ...props }: PageProps & React.ComponentProps<'div'>) {
    return (
        <Page 
            title={title} 
            head={<>
                {head}
                <script type="text/javascript" src="/statics/logged_in_page.js"/>
            </>} 
            className="flex-row"
        >
            <Menu/>
            <main {...props}>
                {children}
            </main>
        </Page>
    )
}
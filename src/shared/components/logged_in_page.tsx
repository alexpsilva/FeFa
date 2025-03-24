import Menu from "./menu";
import Page from "./page";

type PageProps = Pick<React.ComponentProps<typeof Page>, "title" | "head">;

export default function LoggedInPage({ title, head, children, ...props }: PageProps & React.ComponentProps<'div'>) {
    return (
        <Page 
            title={title} 
            head={<>
                {head}
                <script src="https://unpkg.com/htmx.org@2.0.2"></script> {/* to-do: Consider downloading and serving this file ourselves */}
                <script src="/statics/logged_in_page.js"></script>
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
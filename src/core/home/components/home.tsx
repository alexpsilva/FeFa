import LoggedInPage from '../../../shared/components/logged_in_page';

export default function Home() {
    return (
        <LoggedInPage title="FeFa Care">
            <main className="flex-center">
                <h2>Bem vindo</h2>
            </main>
        </LoggedInPage>
    )
}
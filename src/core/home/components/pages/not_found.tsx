import BackButton from '../../../../shared/components/back_button';
import LoggedInPage from '../../../../shared/components/logged_in_page';

export default function NotFoundPage() {
    return (
        <LoggedInPage title="Não encontrado">
            <BackButton/>
            <div className='flex-center'>
                <h2>Não encontrado</h2>
            </div>
        </LoggedInPage>
    )
}
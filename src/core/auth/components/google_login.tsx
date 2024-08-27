import Page from "../../../shared/components/page"

export default function GoogleLogin() {
    return (
        <Page title="Login com Google"
            head={<script src="https://accounts.google.com/gsi/client" async></script>}
        >
            <main className="flex-column flex-center">
                <h2>Bem Vindo!</h2>
                <div id="g_id_onload"
                    data-client_id="865925412334-d1v9fpa2lcb113t35u604b8k148sum3r.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-login_uri="http://localhost:3000/login-receiver"
                    data-auto_prompt="false">
                </div>

                <div className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div>
            </main>
        </Page>
    )
}
<script lang="ts">
    import { page } from '$app/state';

    const loginReceiverUrl = new URL('/auth/login-receiver', page.url)
</script>

<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async></script>
    <title>Login com Google</title>
</svelte:head>

<main class="flex-column flex-center">
    <h2>Bem Vindo!</h2>
    <div id="g_id_onload"
        data-client_id="865925412334-d1v9fpa2lcb113t35u604b8k148sum3r.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri={loginReceiverUrl}
        data-auto_prompt="false">
    </div>

    <div class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
    </div>
</main>
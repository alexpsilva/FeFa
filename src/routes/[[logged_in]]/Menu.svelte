<script lang="ts">
    import LogoutIcon from '$lib/components/icons/Logout.svelte';
</script>

<menu class="content-wrapper flex-column text-lg content-evidence">
    <a href="/">Home</a>
    <a href="/pacient">Pacientes</a>
    <a href="/appointment">Consultas</a>
    <a href="/medication">Medicações</a>
    <div class="flex-grow"></div>
    <a href="/logout" class="flex-row flex-items-center gap-sm" style="marginBottom: 1rem">
        <LogoutIcon width="1.5rem" height="1.5rem"/>
        Sair
    </a>
</menu>
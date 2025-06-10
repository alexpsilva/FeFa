<svelte:head>
    <title>Criar Paciente</title>
</svelte:head>

<script lang="ts">
    import Anchor from "$lib/components/Anchor.svelte";
    import Button from "$lib/components/Button.svelte";
    import CrossIcon from "$lib/components/icons/Cross.svelte";
    import SaveIcon from "$lib/components/icons/Save.svelte";
    import PacientFieldset from "../PacientFieldset.svelte";
</script>

<main class="flex-column flex-items-center">
    <div class="flex-column gap-md card-lg">
        <h2 class="flex-self-start">Criar Paciente</h2>
        <form
            action="?/create"
            method="POST"
            class="content-wrapper card-lg flex-column"
        >
            <PacientFieldset />
            <div class="flex-row">
                <div class="flex-grow"></div>
                <Button type="submit">
                    <SaveIcon width="1rem" height="1rem"/>
                    Salvar
                </Button>
                <Anchor href="/pacient">
                    <CrossIcon width="1rem" height="1rem"/>
                    Cancelar
                </Anchor>
            </div>
        </form>
    </div>
</main>
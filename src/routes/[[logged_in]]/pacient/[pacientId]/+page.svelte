<svelte:head>
    <title>Editar Paciente</title>
</svelte:head>

<script lang="ts">
    import Anchor from "$lib/components/Anchor.svelte";
    import Button from "$lib/components/Button.svelte";
    import CrossIcon from "$lib/components/icons/Cross.svelte";
    import SaveIcon from "$lib/components/icons/Save.svelte";
    import TrashIcon from "$lib/components/icons/Trash.svelte";
    import PacientFieldset from "../PacientFieldset.svelte";
    
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<main class="flex-column flex-items-center">
    <div class="flex-column gap-md card-lg">
        <h2 class="flex-self-start">Editar Paciente</h2>
        {#await data.pacient}
            <div class="flex-row flex-center padding-md">
                <span>Carregando...</span>
            </div>
        {:then pacient}
            <form
                action="?/update"
                method="POST"
                class="content-wrapper card-lg flex-column"
            >
                <PacientFieldset pacient={pacient}/>
                <div class="flex-row">
                    <!-- to-do: Alert before deleting -->
                    <Button 
                        class="content-alert"
                    >
                        <TrashIcon width="1rem" height="1rem"/>
                        Deletar
                    </Button>
                    <div class="flex-grow"></div>
                    <Button 
                        type="submit"
                    >
                        <SaveIcon width="1rem" height="1rem"/>
                        Salvar
                    </Button>
                    <Anchor href={`/pacient/${pacient.id}`}>
                        <CrossIcon width="1rem" height="1rem"/>
                        Cancelar
                    </Anchor>
                </div>
            </form>
        {/await}
    </div>
</main>
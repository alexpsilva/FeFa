<svelte:head>
    <title>Pacientes</title>
</svelte:head>

<script lang="ts">
    import Anchor from '$lib/components/Anchor.svelte';
    import PaginationControls from '$lib/components/PaginationControls.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    
    import searchParam from '$lib/utils/http/searchParam';
    import { ListPacientsDto } from './dto';
    
    import type { PageProps } from './$types';
    import { page } from '$app/state';

    const { searchTerm, pageNumber, pageSize } = ListPacientsDto.parse({ 
        searchTerm: searchParam(page.url, 'searchTerm'),
        pageNumber: searchParam(page.url, 'pageNumber'),
        pageSize: searchParam(page.url, 'pageSize')
    });

    let { data }: PageProps = $props();
</script>

<main class="flex-column flex-items-center gap-lg">
    <SearchBar
        action="/pacient" 
        method="get" 
        name="searchTerm"
        initialTerm={searchTerm}
    />
    <div class="content-wrapper card-lg flex-column">
        <header class="content-faded padding-md border-bottom">
            Pacientes
        </header>
        {#await data.pacients}
            <div class="flex-row flex-center padding-md">
                <span>Carregando...</span>
            </div>
        {:then pacients}
            <div class="flex-column items-padding-md">
                {#each pacients.data as pacient}
                    <a href={`/pacient/${pacient.id}`}>{pacient.name}</a>
                {/each}
            </div>
            <div class="flex-row flex-space-between">
                <Anchor href="/pacient/create" >                    
                    + Novo Paciente
                </Anchor>
                <PaginationControls 
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalCount={pacients.count}
                    href={`/pacient?searchTerm=${searchTerm}`}
                />
            </div>
        {/await}
    </div>
</main>
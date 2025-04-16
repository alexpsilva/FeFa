<svelte:head>
    <title>Pacientes</title>
</svelte:head>

<script lang="ts">
    import SearchIcon from '$lib/components/icons/Search.svelte';
    import Anchor from '$lib/components/Anchor.svelte';
    import PaginationControls from '$lib/components/PaginationControls.svelte';
    import searchParam from '$lib/utils/searchParam';

    import type { PageProps } from './$types';
    import { ListPacientsDto } from './dto';

    import { page } from '$app/state';

    const { searchTerm, pageNumber, pageSize } = ListPacientsDto.parse({ 
        searchTerm: searchParam(page.url, 'searchTerm'),
        pageNumber: searchParam(page.url, 'pageNumber'),
        pageSize: searchParam(page.url, 'pageSize')
    });

    let { data }: PageProps = $props();
</script>

<div class="flex-column flex-items-center gap-lg">
	<form 
		action="/pacient" 
		method="get" 
		class="content-wrapper card-md flex-row"
	>
		<input 
			type="text" 
			name="searchTerm" 
			placeholder="Pesquisar" 
			value={searchTerm} 
			class="flex-grow padding-md border-none"
		/>
		<button 
			type="submit" 
			class="padding-x-md border-radius content-evidence"
		>
			<SearchIcon width="1.5rem" height="1.5rem"/>
		</button>
	</form>
	<div class="content-wrapper card-lg flex-column">
		<header class="content-faded padding-md border-bottom">
			Pacientes
		</header>
		<div class="flex-column items-padding-md">
            {#each data.pacients.data as pacient}
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
				totalCount={data.pacients.count}
				href={`/pacient?searchTerm=${searchTerm}`}
			/>
		</div>
	</div>
</div>
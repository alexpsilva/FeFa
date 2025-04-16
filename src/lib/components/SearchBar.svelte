<script lang="ts">
    import SearchIcon from '$lib/components/icons/Search.svelte';
    import type { SvelteHTMLElements } from 'svelte/elements';

    type Props = SvelteHTMLElements['form'] & {
        initialTerm?: string;
        name: string;
    };

    let { initialTerm, name, ...props }: Props = $props();
</script>


<form 
    {...props}
    class={['content-wrapper card-md flex-row', props.class]}
>
    <input 
        type="text" 
        name={name}
        placeholder="Pesquisar" 
        value={initialTerm} 
        class="flex-grow padding-md border-none"
    />
    <button 
        type="submit" 
        class="padding-x-md border-radius content-evidence"
    >
        <SearchIcon width="1.5rem" height="1.5rem"/>
    </button>
</form>
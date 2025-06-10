<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements';

    let props: SvelteHTMLElements['button'] = $props();
</script>

<button 
    {...props}
    class={['padding-md border-radius content-evidence flex-row flex-items-center gap-sm', props.class]}
>
    {@render props.children?.()}
</button>
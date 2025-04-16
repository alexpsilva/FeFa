<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements';

    let { class: _class, children, ...props}: SvelteHTMLElements['a'] = $props();
    let mergedClass = `padding-md border-radius content-evidence flex-row flex-items-center gap-sm ${_class ?? ''}`;
</script>

<a class={mergedClass} {...props}>
    {@render children?.()}
</a>
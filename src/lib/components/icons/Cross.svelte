<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements';

    let props: SvelteHTMLElements['svg'] = $props();
</script>

<svg
    viewBox='0 0 24 24'
    stroke-width='3'
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'
    {...props}
>
<path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <line x1='2' y1='2' x2='20' y2='20' />
    <line x1='2' y1='20' x2='20' y2='2' />
</svg>
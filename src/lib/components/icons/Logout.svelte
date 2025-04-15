<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements';

    let props: SvelteHTMLElements['svg'] = $props();
</script>

<svg
    viewBox='0 0 30 24'
    stroke-width='3'
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'
    {...props}
>
    <path id='Arrow' d='M20 12 H2 L6 16 L2 12 L6 8' fill='none' />
    <path id='Box' d='M14 18 V22 H28 V2 H14 V6' fill='none' />
</svg>

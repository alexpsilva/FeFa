<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements';

    let props: SvelteHTMLElements['svg'] = $props();
</script>

<svg
    viewBox='0 0 24 24'
    stroke-width='2'
    fill='none'
    {...props}
>
    <polygon
        points='
            21, 7
            21, 21
            4, 21
            4, 3
            17, 3
        '
        stroke-linejoin='round'
    />
    <rect width="10" height="8" x="7" y="13"/>
    <rect width="8" height="5" x="8" y="3"/>
</svg>

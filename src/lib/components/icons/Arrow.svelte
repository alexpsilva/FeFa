<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements';

    type Props = SvelteHTMLElements['svg'] & {
        direction: 'up' | 'down' | 'left' | 'right'
    }

    let { direction, ...props }: Props = $props();
    
    let rotation = $derived.by(() => {
        switch (direction) {
            case 'up': return 0;
            case 'right': return 90;
            case 'down': return 180;
            case 'left': return 270;
        }
    })
</script>

<svg
    viewBox='0 0 25 25'
    stroke-width='3'
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'
    {...props}
    >
    <path
        transform={`rotate(${rotation}, 13, 13)`}
        d='M13 23 V2 L7 8 M13 2 L19 8'
        fill='none'
    />
</svg>

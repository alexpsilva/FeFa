<script lang="ts">
    import Menu from './Menu.svelte';

    let { children } = $props();
</script>

<div class="flex-row">
    <Menu/>
        {@render children?.()}
</div>
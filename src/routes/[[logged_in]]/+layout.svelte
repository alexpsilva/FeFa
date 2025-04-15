<script lang="ts">
    import Menu from '$lib/components/Menu.svelte';

    let { children } = $props();
</script>

<div class="flex-row">
    <Menu/>
    <main>
        {@render children?.()}
    </main>
</div>
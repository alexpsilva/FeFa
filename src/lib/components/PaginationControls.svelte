<script lang="ts">
    import ArrowIcon from '$lib/components/icons/Arrow.svelte';
    import type { SvelteHTMLElements } from 'svelte/elements';

    type Props = SvelteHTMLElements['div'] & {
        pageNumber: number, 
        pageSize: number,
        totalCount: number,
        href: string,
    }

    const { pageNumber, pageSize, totalCount, href, ...props }: Props = $props();

    const numPages = $derived(Math.ceil(totalCount / pageSize));
    const croppedPageNumber = $derived(pageNumber > numPages ? numPages : pageNumber);
    const previousPageUrl = $derived(croppedPageNumber <= 1 ? null : buildUrl(href, croppedPageNumber - 1, pageSize));
    const nextPageUrl = $derived(croppedPageNumber === numPages ? null : buildUrl(href, croppedPageNumber + 1, pageSize));

    function buildUrl(href: string, pageNumber: number, pageSize: number) {
        let url = new String(href)
        if (url.includes('?')) {
            url += '&'
        } else {
            url += '?'
        }

        return `${url}pageNumber=${pageNumber}&pageSize=${pageSize}`
    }
</script>

<div class="flex-row" {...props}>
    {#if previousPageUrl}
        <a href={previousPageUrl} class="padding-md border-radius content-evidence flex-items-center">
            <ArrowIcon direction="left" width="1.5rem" height="1.5rem"/>
        </a>
    {/if}
    <span class="padding-md flex-items-center">{croppedPageNumber}/{numPages}</span>
    {#if nextPageUrl}
        <a href={nextPageUrl} class="padding-md border-radius content-evidence flex-items-center">
            <ArrowIcon direction="right" width="1.5rem" height="1.5rem"/>
        </a>
    {/if}
</div>
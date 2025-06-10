<script lang="ts">
    import type { Pacient } from '$lib/schemas/core/pacient';
    import type { SvelteHTMLElements } from 'svelte/elements';

    type Props = SvelteHTMLElements['fieldset'] & {
        pacient?: Partial<Pacient>;
    };

    let { pacient, ...props }: Props = $props();
    let age = $derived(pacient?.birthday ? new Date().getFullYear() - pacient.birthday.getFullYear() : undefined)
</script>

<fieldset class="padding-lg grid-flow-row grid-cols-2 gap-md" {...props}>
    <div class="flex-column">
        <label for="name" class="content-faded text-sm">Nome</label>
        <input id="name" name="name" type="text" value={pacient?.name}/>
    </div>

    <div class="flex-column">
        {#if pacient?.birthday && props.disabled}
            <span class="content-faded text-sm">Idade</span>
            <span>{age} anos <span class="content-faded">({pacient.birthday.toLocaleDateString('pt-br')})</span></span>
        {:else}
            <label for="birthday" class="content-faded text-sm">Data de Nascimento</label>
            <input id="birthday" name="birthday" type="date" value={pacient?.birthday?.toISOString().split('T')[0]}/>
        {/if}
    </div>

    <div class="flex-column">
        <label for="cpf" class="content-faded text-sm">CPF</label>
        <input id="cpf" name="cpf" type="text" value={pacient?.cpf}/> <!-- to-do: Add CPF mask -->
    </div>

    <div class="flex-column">
        <label for="address" class="content-faded text-sm">Endereço</label>
        <input id="address" name="address" type="text" value={pacient?.address}/>
    </div>
</fieldset>
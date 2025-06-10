<svelte:head>
    <title>Calculadora</title>
</svelte:head>

<script lang="ts">
    import TrashIcon from "$lib/components/icons/Trash.svelte";

    let workHoursPerDay = $state(8);
    let workDaysPerWeek = $state(5);
    const weeksPerMonth = 4;

    let appointmentDuration = $state(30);

    let appointmentsPerDay = $derived(Math.floor((workHoursPerDay * 60) / appointmentDuration));
    let appointmentsPerMonth = $derived(appointmentsPerDay * workDaysPerWeek * weeksPerMonth);

    let appointmentPrice = $state(100);

    let earningsPerMonth = $derived(appointmentsPerMonth * appointmentPrice);

    let costList = $state([{id: 0, name: 'Aluguel', value: 200}] as { id: number; name: string; value: number }[]);

    let costsPerMonth = $derived(
        costList.reduce((total, expense) => total + expense.value, 0)
    );
    let profitPerMonth = $derived(earningsPerMonth - costsPerMonth);
</script>

<main class="flex-column flex-items-center">
    <h1 class="flex-center">Calculadora de consultório</h1>

    <div class="flex-row flex-media-column card-md gap-md">
        <div class="content-wrapper border-radius flex-column flex-grow">
            <div>
                <header class="content-faded padding-md border-bottom">
                    Receitas
                </header>

                <fieldset>
                    <div>
                        <label for="workHoursPerDay" class="content-faded text-sm">Horas de trabalho: </label>
                        <input id="workHoursPerDay" name="workHoursPerDay" type="text" maxlength="2" size="2" bind:value={workHoursPerDay}/>
                        <span class="content-faded text-sm">horas por dia</span>
                    </div>
            
                    <div>
                        <label for="workDaysPerWeek" class="content-faded text-sm">Dias de trabalho: </label>
                        <input id="workDaysPerWeek" name="workDaysPerWeek" type="text" maxlength="1" size="1" bind:value={workDaysPerWeek}/>
                        <span class="content-faded text-sm">dias por semana</span>
                    </div>
            
                    <div>
                        <label for="appointmentDuration" class="content-faded text-sm">Duração da consulta: </label>
                        <input id="appointmentDuration" name="appointmentDuration" type="text" maxlength="3" size="3" bind:value={appointmentDuration}/>
                        <span class="content-faded text-sm">minutos</span>
                    </div>
            
                    <div>
                        <label for="appointmentPrice" class="content-faded text-sm">Preço da consulta: </label>
                        <input id="appointmentPrice" name="appointmentPrice" type="text" maxlength="5" size="5" bind:value={appointmentPrice}/>
                        <span class="content-faded text-sm">reais</span>
                    </div>
                </fieldset>

            </div>

            <div>
                <header class="content-faded padding-md border-bottom">
                    Despesas
                </header>
                {#each costList as expense, index (expense.id)}
                    <div class="flex-row gap-sm padding-x-md padding-y-sm">
                        <div class="flex-grow gap-sm flex-row">
                            <input id="expense-{index}-name" style="width: 100%;" type="text" placeholder="Despesa" bind:value={expense.name} />
                            <label for="expense-{index}-value">R$ </label>
                            <input id="expense-{index}-value" type="number" placeholder="Valor" style="width: 4em" bind:value={expense.value} />
                        </div>
                        <TrashIcon 
                            class="hover-cursor"
                            width="1.5rem" height="1.5rem" 
                            onclick={() => costList.splice(index, 1)}
                        />
                    </div>
                {/each}
                <div class="flex-row flex-end">
                    <button 
                        class="content-evidence padding-md border-radius"
                        type="button" 
                        onclick={() => costList.push({ id: Date.now(), name: '', value: 0 })}
                    >
                    Adicionar +
                    </button>
                </div>
            </div>
        </div>
    
        <div class="content-wrapper border-radius flex-column">
            <header class="content-faded padding-md border-bottom">
                Resultados
            </header>
            <div class="items-padding-x-md">
                <p>Consultas por dia: {appointmentsPerDay}</p>
                <p>Consultas por mês: {appointmentsPerMonth}</p>
                <p>Receita por mês: R$ {earningsPerMonth}</p>
                <p>Despesas por mês: R$ {costsPerMonth}</p>
                <p>Lucro por mês: R$ {profitPerMonth}</p>
            </div>
    
        </div>
    </div>
</main>
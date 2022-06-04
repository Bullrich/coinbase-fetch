<script lang="ts">
    import { to_number } from "svelte/internal";

    import { Button, Table } from "sveltestrap";
    import { exportToJsonFile } from "../api/export";
    import type { Account } from "../config/coinbaseTypes";

    export let accounts: Account[];
    const balances = accounts
        .map((bals) => bals.balance)
        .sort((a, b) => (to_number(a.amount) > to_number(b.amount) ? 1 : -1));

    const exportBalances = () => exportToJsonFile("balances.json", balances);
</script>

<Button on:click={exportBalances} color="info">
    <div class="button-content">Export data</div>
</Button>
<Table>
    <thead>
        <tr>
            <th>Currency</th>
            <th>Balance</th>
        </tr>
    </thead>
    <tbody>
        {#each balances as bal}
            <tr>
                <th scope="row" id={bal.currency}>
                    {bal.currency}
                </th>
                <td>{bal.amount}</td>
            </tr>
        {/each}
    </tbody>
</Table>

<style>
    .button-content {
        color: white;
    }
</style>

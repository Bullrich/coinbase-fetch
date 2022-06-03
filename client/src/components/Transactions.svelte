<script lang="ts">
    import { Table, Tooltip } from "sveltestrap";
    import type { UserTransactions } from "../config/coinbaseTypes";

    export let transactions: UserTransactions;
    const ops = (({ transactions, ...o }) => o)(transactions);
    const entries = Object.entries(ops);
</script>

{#each entries as entry}
    <h5>{entry[0]}</h5>
    {#if entry[1].length < 1}
        No data
    {:else}
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {#each entry[1] as op}
                    <tr>
                        <th scope="row" id={op.id}
                            >{op.id.substring(op.id.length - 5)}</th
                        >
                        <Tooltip target={op.id} placement="top">{op.id}</Tooltip
                        >
                        <td>{op.status}</td>
                        <td>{`${op.amount.amount} ${op.amount.currency}`}</td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/if}
{/each}
<h5>Transactions</h5>
{#if transactions.transactions.length < 1}
    No data
{:else}
    <Table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Detail</th>
            </tr>
        </thead>
        <tbody>
            {#each transactions.transactions as tx}
                <tr>
                    <th scope="row" id={tx.id}
                        >{tx.id.substring(tx.id.length - 5)}</th
                    >
                    <Tooltip target={tx.id} placement="top">{tx.id}</Tooltip>
                    <td>{tx.status}</td>
                    <td>{`${tx.amount.amount} ${tx.amount.currency}`}</td>
                    <td>{tx.details.title}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
{/if}

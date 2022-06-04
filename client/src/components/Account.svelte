<script lang="ts">
    import { to_number } from "svelte/internal";
    import {
        Button,
        Card,
        CardHeader,
        CardTitle,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Spinner,
    } from "sveltestrap";
    import { exportToJsonFile } from "../api/export";
    import { fetchAccountTransactions as fetchTransactions } from "../api/fetch";
    import type { Account, UserTransactions } from "../config/coinbaseTypes";
    import Transactions from "./Transactions.svelte";
    export let account: Account;

    let accountTransactions: Promise<UserTransactions> | null = null;

    async function fetchAccountTransactions() {
        if (accountTransactions != null) {
            return accountTransactions;
        }

        accountTransactions = fetchTransactions(account.id);
    }

    let open = false;
    const toggle = () => {
        open = !open;
        fetchAccountTransactions();
    };
</script>

<Card>
    <CardHeader>
        <CardTitle>{account.name}</CardTitle>
    </CardHeader>

    <Card body>
        <h4>Balance</h4>
        <p>{to_number(account.balance.amount)} {account.balance.currency}</p>

        <Button color="primary" on:click={toggle} class="mb-3">
            See trades
        </Button>

        <Modal isOpen={open} {toggle}>
            <ModalHeader {toggle}>Transactions for {account.name}</ModalHeader>
            <ModalBody>
                {#await accountTransactions}
                    Loading transactions <br /><Spinner />
                {:then tx}
                    <Transactions transactions={tx} />
                    <hr />
                    <Button
                        color="primary"
                        on:click={() =>
                            exportToJsonFile(
                                `${account.name}.json`,
                                tx
                            )}
                    >
                        Save as JSON
                    </Button>
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" on:click={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    </Card>
</Card>

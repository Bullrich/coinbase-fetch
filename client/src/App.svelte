<script lang="ts">
	import { Col, Container, Row, TabContent, TabPane } from "sveltestrap";
	import { fetchAccounts, fetchUser } from "./api/fetch";
	import Account from "./components/Account.svelte";
	import Balances from "./components/Balances.svelte";

	const userPromise = fetchUser();

	async function fetchAndOrderAccounts() {
		const accounts = await fetchAccounts();
		return accounts.sort((a, b) => {
			if (a.balance.amount === b.balance.amount) {
				return a.name > b.name ? 1 : -1;
			}
			return b.balance.amount > a.balance.amount ? 1 : -1;
		});
	}

	const accountsPromise = fetchAndOrderAccounts();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
	/>
</svelte:head>

<main>
	<Container>
		{#await userPromise then user}
			<h1>Hello {user.name}!</h1>
		{/await}
		{#await accountsPromise}
			<p>Fetching accounts</p>
		{:then accounts}
			<TabContent>
				<TabPane tabId="accounts" tab="Accounts" active>
					<div class="tab-content">
						<Row>
							{#each accounts as account}
								<Col sm={4}>
									<div class="account-data">
										<Account {account} />
									</div>
								</Col>
							{/each}
						</Row>
					</div>
				</TabPane>
				<TabPane tabId="balances" tab="Balances">
					<div class="tab-content">
						<Balances {accounts} />
					</div>
				</TabPane>
			</TabContent>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</Container>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.account-data {
		margin-bottom: 20px;
	}

	.tab-content {
		margin-top: 10px;
	}
</style>

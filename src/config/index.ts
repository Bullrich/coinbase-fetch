type Credentials = { key: string, secret: string };

let credentials: Credentials;

export default function fetchCredentials(): Credentials {
    if (credentials) {
        return credentials;
    }
    const apiKey = process.env.COINBASE_KEY;

    if (!apiKey) {
        throw new Error("COINBASE_KEY has not been set");
    }
    const apiSecret = process.env.COINBASE_SECRET;

    if (!apiSecret) {
        throw new Error("COINBASE_SECRET has not been set");
    }

    credentials = {
        key: apiKey,
        secret: apiSecret
    };

    return credentials;
}

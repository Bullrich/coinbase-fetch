import fetchCredentials from ".";

describe("Configuration fetcher", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test("Fails if no api key was set", () => {
        process.env.COINBASE_KEY = "";
        expect(() => fetchCredentials()).toThrowError("COINBASE_KEY has not been set");
    });


    test("Fails if no api secret was set", () => {
        process.env.COINBASE_KEY = "abc";
        process.env.COINBASE_SECRET = "";
        expect(() => fetchCredentials()).toThrowError("COINBASE_SECRET has not been set");
    });
});

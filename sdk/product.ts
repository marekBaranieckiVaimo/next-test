import { client } from "./client";

export const getProductById = async (ID: string) => {
    const ctClient = client();
    return ctClient.products().withId({ID}).get().execute();
}
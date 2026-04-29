import axios from "axios";

export default async function getElectronics() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
            params: { "category[in]": "6439d2d167d9aa4ca970649f" }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching electronics:", error);
        throw error;
    }
}
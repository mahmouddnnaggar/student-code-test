import z from "zod";

export         const shippingAdressSchema= z.object({
    details:z.string().nonempty().min(10,"Address must be at least 10 characters long")
    .max(200,"Address must be at most 200 characters long"),

    phone:z.string().nonempty().regex(/^(\+2)?01[0125][0-9]{8}$/,"Invalid Egyption phone number"),

    city:z.string().nonempty().min(2,"city must be at least 2 charcters long").max(50, "City must be at most 50 characters long ")

})


 export     type shippingAdressValuse=z.infer<typeof shippingAdressSchema>
export default async (token) => {
    const data = await fetch(`${process.env.SERVER}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    return data;
};

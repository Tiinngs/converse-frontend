export default async (user, pass, path) => {
    const data = await fetch(`${process.env.SERVER}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: user,
            password: pass,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    return data;
};

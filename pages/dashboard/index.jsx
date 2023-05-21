import { useEffect, useState } from "react";
import { FaCartPlus, FaMoneyBillWave } from "react-icons/fa";

const page = ({ orders }) => {

    const [earning, setEarning] = useState(0);

    async function dl(e, id) {
        e.preventDefault()
        await fetch(`${process.env.SERVER}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                location.reload();
            });
    }

    useEffect(() => {
        let earn = 0;
        orders?.forEach(e => {
            earn += Number(e.price);
            setEarning(earn);
        });
    }, [])

    return (
        <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-48">
            <section className="flex flex-col space-y-12 pb-44">
                <div className="w-full flex justify-center items-center gap-6">
                    <div className="w-1/3 p-6 shadow-2xl rounded-xl flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl text-blue-500">{orders.length}</h1>
                            <p className="text-gray-400">Sales</p>
                        </div>
                        <FaCartPlus size={56} className="text-gray-600" />
                    </div>
                    <div className="w-1/3 p-6 shadow-2xl rounded-xl flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl text-blue-500">฿{earning}</h1>
                            <p className="text-gray-400">Earning</p>
                        </div>
                        <FaMoneyBillWave size={56} className="text-gray-600" />
                    </div>
                </div>
                <table className="w-full">
                    <thead className="border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 w-1/4 text-2xl tracking-wide text-left">Name</th>
                            <th className="p-3 w-2/4 text-2xl tracking-wide text-left">Product</th>
                            <th className="p-3 w-1/4 text-2xl tracking-wide text-left">Price</th>
                            <th className="p-3 w-1/4 text-2xl tracking-wide text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((p, k) => (
                            <tr key={k}>
                                <td className="p-3 text-xl text-gray-700">{p.users.username}</td>
                                <td className="p-3 text-xl text-gray-700">{p.order}</td>
                                <td className="p-3 text-xl text-gray-700">{p.price}</td>
                                <td className="p-3 text-xl text-gray-700 text-center">
                                    <button className="text-red-400" onClick={(e) => dl(e, p.id)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default page

export async function getStaticProps() {
    const orders = await (await fetch(`${process.env.SERVER}/order`)).json();
    return {
        props: {
            orders,
        },
    };
}

import ProductImage from "@/components/ProductImage";
import notify from "@/libs/notify";
import React from "react";

const product = ({ products }) => {
    async function orderNow(e, order, price) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await fetch(`${process.env.SERVER}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                order,
                price,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 200) {
                    return notify(data.msg, "green");
                }
                return notify(data.msg, "red");
            });
    }

    return (
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
            <ProductImage product={products} />
            <div className="divide-y ">
                <div className="space-y-2 pb-8">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        {products.title}
                    </h1>
                    <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
                        ฿{products.price}
                    </h2>
                </div>
                <div className="pt-8">
                    <p className="text-xs md:text-sm">
                        {products.description}
                    </p>
                </div>
                <button
                    onClick={(e) =>
                        orderNow(e, products.title, products.price)
                    }
                    className="absolute -bottom-18 right-0 bg-slate-900 text-white p-2 rounded-lg hover:-translate-y-2">Order Now
                </button>
            </div>
        </div>
    )
};

export default product;

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: "1" } },
            { params: { id: "2" } },
            { params: { id: "3" } },
            { params: { id: "4" } },
            { params: { id: "5" } },
            { params: { id: "6" } },
            { params: { id: "7" } },
            { params: { id: "8" } },
        ],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const products = await (
        await fetch(`${process.env.SERVER}/products/${params.id}`)
    ).json();
    if (product) {
        return {
            props: {
                products,
            },
        };
    } else {
        return {
            props: {
                products: null,
            },
        };
    }
}

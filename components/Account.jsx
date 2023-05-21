import notify from "@/libs/notify";
import React, { useEffect, useState } from "react";

export default function Account({ user }) {
    const [data, setData] = useState({
        address: "",
        phone: "",
    });

    function dataChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function getAddress() {
        const token = localStorage.getItem("token");
        await fetch(`${process.env.SERVER}/getAddress`, {
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
                setData({
                    address: data.address.address,
                    phone: data.address.phone,
                });
            });
    }

    async function updateAddress(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const { address, phone } = data;
        await fetch(`${process.env.SERVER}/updateAddress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                address,
                phone,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                return notify(data.msg, "green");
            });
    }

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div className="mt-6 w-full">
            <h1 className="w-full my-6 text-center text-5xl">{user}</h1>
            <p className="text-xl">address: </p>
            <input
                autoComplete="off"
                type="text"
                className="bg-gray-200 p-2 rounded-md w-full mb-6"
                name="address"
                value={data.address}
                onChange={dataChange}
            />
            <p className="text-xl">phone: </p>
            <input
                autoComplete="off"
                type="text"
                className="bg-gray-200 p-2 rounded-md w-full mb-6"
                name="phone"
                value={data.phone}
                onChange={dataChange}
            />
            <p className="mt-6 flex w-full justify-end items-center text-xl">
                <button onClick={updateAddress} className="p-2 rounded-md border-2 border-slate-900 bg-slate-900 text-white hover:text-slate-900 hover:bg-white">
                    Update
                </button>
            </p>
        </div>
    );
}

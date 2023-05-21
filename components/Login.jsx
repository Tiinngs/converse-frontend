import authen from "@/libs/authen";
import fetchData from "@/libs/fetchData";
import notify from "@/libs/notify";
import React, { useEffect, useState } from "react";

import { FaAddressBook } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { MdDashboard } from "react-icons/md"
import Account from "./Account";

export default function Login() {
    const [active, setActive] = useState(false);
    const [change, setChange] = useState(false);
    const [data, setData] = useState({
        user: "",
        pass: "",
        pass2: "",
    });

    function dataChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function onLogin(e) {
        e.preventDefault();
        const { user, pass } = data;
        if (!user || !pass) return notify("username or password is null", "red");
        const res = await fetchData(user, pass, "login");
        if (res.code === 200) {
            localStorage.setItem("token", res.token);
            notify(res.msg, "green");
            setTimeout(() => {
                location.reload();
                setActive(false);
            }, 2000);
            return;
        }
        return notify(res.msg, "red");
    }

    async function onRigister(e) {
        e.preventDefault();
        const { user, pass, pass2 } = data;
        if (!user || !pass || !pass2)
            return notify("username or password is null.", "red");
        if (pass !== pass2) return notify("password not match.", "red");
        const res = await fetchData(user, pass, "register");
        if (res.code === 200) {
            setChange(false);
            return notify(res.msg, "green");
        }
        return notify(res.msg, "red");
    }

    const [user, setUser] = useState();
    const [close, setClose] = useState(true);

    async function auth() {
        const token = localStorage.getItem("token");
        const res = await authen(token);
        if (res.code === 200) {
            setUser(res.data.username);
        }
        return
    }

    useEffect(() => {
        auth();
    }, [])

    return (
        <div>
            {user ? (
                <div className="flex justify-center items-center gap-6">
                    <h1 className="text-2xl">{user}</h1>
                    {user === "admin" ? (
                        <>
                            <MdDashboard className="cursor-pointer" size={36} onClick={() => { window.location.href = "/dashboard"; }} />
                            <FiLogOut className="cursor-pointer" size={36} onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }} />
                        </>
                    ) : (
                        <>
                            <FaAddressBook onClick={() => setClose(false)} size={32} className="cursor-pointer" />
                            <div className={`${close ? "translate-x-full" : "translate-x-0"} fixed top-0 right-0 w-96 h-screen p-6 bg-white shadow-2xl`}>
                                <div className="flex justify-between items-center">
                                    <p onClick={() => setClose(true)} className="w-fit cursor-pointer text-xl hover:underline">Close</p>
                                    <p onClick={() => { localStorage.removeItem("token"); location.reload(); }} className="w-fit cursor-pointer text-xl hover:underline">Logout</p>
                                </div>
                                <Account user={user} />
                            </div>
                        </>
                    )}
                </div>
            ): (
                <button onClick={() => setActive(true)} className="px-4 py-2 rounded-xl text-xl text-white bg-slate-900 hover:bg-white hover:text-slate-900">Login</button>
            )}

            <div
                className={`fixed top-0 left-0 backdrop-blur-md z-50 flex justify-center items-center w-full h-screen ${
                    active ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <form
                    onSubmit={change ? onRigister : onLogin}
                    className="relative flex flex-col justify-center items-center bg-gray-300 p-6 rounded-lg"
                >
                    <p
                        onClick={() => setActive(false)}
                        className="absolute top-0 right-2 p-2 hover:text-white cursor-pointer"
                    >
                        X
                    </p>
                    <h1 className="text-5xl m-6">
                        {change ? "Register" : "Login"}
                    </h1>
                    <input
                        className="p-2 m-4 w-96 rounded-md"
                        type="text"
                        name="user"
                        autoComplete="off"
                        onChange={dataChange}
                        placeholder="username"
                    />
                    <input
                        className="p-2 m-4 w-96 rounded-md"
                        type="password"
                        name="pass"
                        onChange={dataChange}
                        placeholder="password"
                    />
                    {change ? (
                        <input
                            className="p-2 m-4 w-96 rounded-md"
                            type="password"
                            name="pass2"
                            onChange={dataChange}
                            placeholder="confirm password"
                        />
                    ) : null}
                    <div className="flex justify-end px-6 items-center w-full gap-6">
                        <span
                            onClick={() => setChange(!change)}
                            className="cursor-pointer hover:underline"
                        >
                            {change ? "Login" : "Register"}
                        </span>
                        <button className="text-2xl bg-white border-2 border-white py-1 px-2 rounded-lg">
                            {change ? "Register" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

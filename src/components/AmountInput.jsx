import React, { memo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { toast } from "react-toastify";

const AmountInput = ({ amount, setAmount, quantity }) => {
    return (
        <>
            <button
                type="button"
                className="h-8 w-8 border-accent-content rounded flex justify-center items-center border leading-10 text-accent-content transition hover:opacity-75"
                onClick={() => {
                    if (amount !== 1) {
                        setAmount(amount - 1);
                    }
                }}
            >
                <FaMinus className="text-2xl" />
            </button>

            <input
                type="number"
                id="amount"
                value={amount}
                className="h-8 w-16 rounded border-accent-content border text-xl text-accent-content indent-3"
                readOnly={true}
            />

            <button
                type="button"
                className="h-8 w-8 rounded border-accent-content flex justify-center items-center border leading-10 text-accent-content transition hover:opacity-75"
                onClick={() => {
                    if (amount < quantity) {
                        setAmount(amount + 1);
                    } else {
                        toast.error("Out of stock!", {
                            quantity,
                        });
                    }
                }}
            >
                <FaPlus className="text-2xl" />
            </button>
        </>
    );
};

export default memo(AmountInput);

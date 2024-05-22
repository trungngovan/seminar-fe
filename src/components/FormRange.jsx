import { useState } from "react";
const FormRange = ({ label, name, size, price }) => {
    const step = 100;
    const minPrice = 1000;
    const maxPrice = 10000000;
    const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

    return (
        <div className="form-control">
            <label htmlFor={name} className="label cursor-pointer">
                <span className="label-text capitalize">{label}</span>
                <span>
                    {selectedPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </label>
            <input
                type="range"
                name={name}
                min={minPrice}
                max={maxPrice}
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className={`range range-primary ${size}`}
                step={step}
            />
            <div className="w-full flex justify-between text-xs px-2 mt-2">
                <span className="font-bold text-md">
                    Min:{" "}
                    {minPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
                <span className="font-bold text-md">
                    Max :{" "}
                    {maxPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </div>
        </div>
    );
};
export default FormRange;

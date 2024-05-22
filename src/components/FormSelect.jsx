const FormSelect = ({ label, name, list, defaultValue, size }) => {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <select
                id={name}
                name={name}
                className={`select select-bordered ${size}`}
                defaultValue={defaultValue}
            >
                {list.map((data, index) => {
                    return (
                        <option key={index} value={data.value}>
                            {data.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
export default FormSelect;

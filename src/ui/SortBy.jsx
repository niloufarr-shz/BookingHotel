import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [serachParams, setserachParams] = useSearchParams();
  const sortBy = serachParams.get("sortBy") || "";
  function handleChange(e) {
    serachParams.set("sortBy", e.target.value);
    setserachParams(serachParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;

import { useContext, useEffect, useState } from "react";
import "./searchBar.scss";
import { CiSearch } from "react-icons/ci";
import { Contexts } from "../../contexts/contexts";

const SearchBar = ({ builders, allBoats }) => {
  const { setFilteredResults } = useContext(Contexts);
  const [searchParams, setSearchParams] = useState({
    builder: "",
    class: "",
    minYear: 1920,
    maxYear: new Date().getFullYear(),
    minPrice: 0,
    maxPrice: 50000000,
    minLength: 0,
    maxLength: 300,
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    // console.log({ [name]: value });
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: parseFloat(value) || value,
    }));
  };

  useEffect(() => {
    const {
      builder,
      class: boatClass,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minLength,
      maxLength,
    } = searchParams;

    const results = allBoats.filter(
      (boat) =>
        (builder === "" || boat.BuilderName === builder) &&
        (boatClass === "" || boat.BoatCategoryCode === boatClass) &&
        boat.ModelYear >= parseFloat(minYear, 10) &&
        boat.ModelYear <= parseFloat(maxYear, 10) &&
        parseFloat(boat.Price) <= parseFloat(maxPrice) &&
        parseFloat(boat.Price) >= parseFloat(minPrice) &&
        parseFloat(boat.NominalLength) >= parseFloat(minLength) &&
        parseFloat(boat.NominalLength) <= parseFloat(maxLength)
    );

    setFilteredResults(results);
  }, [searchParams, setFilteredResults, allBoats
  ]);

  const resetFilter = () => {
    setSearchParams({
      builder: "",
      class: "",
      minYear: 1920,
      maxYear: new Date().getFullYear(),
      minPrice: 0,
      maxPrice: 50000000,
      minLength: 0,
      maxLength: 300,
    });
        setFilteredResults([]);
  };

  return (
    <div className="search-bar">
      <div className="textLLora">
        Filter your results{" "}
        <span className="textSRoboto" onClick={resetFilter}>
          {" "}
          Reset Filter
        </span>
      </div>
      <form action="submit" className="textMLora">
        <div className="filter-box ">
          <label htmlFor="builder">Builder</label>
          <select name="builder" id="builder" onChange={handleInputChange}>
            <option value="">Any</option>
            {builders &&
              builders.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="filter-box">
          <label htmlFor="class">Class</label>
          <select name="class" id="class" onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="Power">Power Boats</option>
            <option value="Sail">Sail Boats</option>
          </select>
        </div>

        <div className="filter-box">
          <label htmlFor="minYear">Year</label>
          <div className="input-box">
            <input
              type="number"
              id="minYear"
              name="minYear"
              min={1920}
              max={new Date().getFullYear()}
              placeholder="Min"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="maxYear"
              min={1920}
              max={new Date().getFullYear()}
              placeholder="Max"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="filter-box">
          <label htmlFor="minPrice">Price</label>
          <div className="input-box">
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              min={0}
              placeholder="Min"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="maxPrice"
              min={0}
              max={50000000}
              placeholder="Max"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="filter-box">
          <label htmlFor="minLength">Length &#x28;ft&#x29;</label>
          <div className="input-box">
            <input
              type="number"
              id="minLength"
              name="minLength"
              min={0}
              //   max={50000000}
              placeholder="Min"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="maxLength"
              min={0}
              //   max={300}
              placeholder="Max"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit">
          <CiSearch />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

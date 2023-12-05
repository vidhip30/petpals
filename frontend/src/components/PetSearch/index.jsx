import { useState, useEffect, useMemo } from "react";
import PetCard from "./PetCard";
import { useSearchParams } from "react-router-dom";
import Select from "react-select"; // Import the Select component
import Button from 'react-bootstrap/Button';
import './style.css';
import { getUser } from "../../api/accounts";

function to_url_params(object) {
  var result = [];
  for (const key in object) {
    if (Array.isArray(object[key])) {
      for (const value of object[key]) {
        result.push(`${key}=${value}`);
      }
    } else {
      let value = object[key];
      result.push(`${key}=${value}`);
    }
  }
  return result.join('&');
}

function PetSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [next, setNext] = useState(true);
  const [pets, setPets] = useState([]);
  const [AllPets, setAllPets] = useState([]);
  const [shelterNames, setShelterNames] = useState({});

  const query = useMemo(() => ({
    page: parseInt(searchParams.get("page") ?? 1),
    search: searchParams.get("search") ?? '',
    status: searchParams.getAll("status") ?? ['available'],
    gender: searchParams.getAll("gender") ?? '', // Now initialized as a single value
    breed: searchParams.getAll("breed") ?? [],
    shelter: searchParams.getAll("shelter") ?? [],
    sort_by: searchParams.getAll("sort_by") ?? [],
  }), [searchParams]);
  
  
  

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchAllPages = async (url, allResults = []) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      allResults.push(...json.results);

      if (json.next) {
        await fetchAllPages(json.next, allResults);
      } else {
        setAllPets(allResults);
      }
    };

    fetchAllPages(`http://127.0.0.1:8000/petlistings/`);
  }, []);

  useEffect(() => {
    const params = to_url_params(query);
    const token = localStorage.getItem('accessToken');

    fetch(`http://127.0.0.1:8000/petlistings/?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setPets(json.results);
        setNext(json.next);
      });
  }, [query]);

  const uniqueShelters = [...new Set(AllPets.map((pet) => pet.shelter))];

  useEffect(() => {
    // Fetch shelter data
    const fetchDataForShelters = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const promises = uniqueShelters.map((shelterId) =>
          getUser(shelterId, 'shelter')
            .then((shelterInfo) => ({ [shelterId]: shelterInfo.name }))
        );

        const shelterData = await Promise.all(promises);
        const mergedData = Object.assign({}, ...shelterData);
        setShelterNames(mergedData);
      } catch (error) {
        console.error('Error fetching shelter data:', error);
      }
    };

    fetchDataForShelters();
  }, [uniqueShelters]);

  const uniqueBreeds = [...new Set(AllPets.map((pet) => pet.breed))];

  // Options for the multi-select dropdown
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "age", label: "Age" },
    { value: "size", label: "Size" },
  ];

  return (
    <>
     
      <div class=" search mt-4"
            >
        <label>
          <input
            value={query.search}
            placeholder='Search by breed or name'
            onChange={(event) => setSearchParams({ ...query, search: event.target.value, page: 1 })}
          />
        </label>
      </div>
    <div className="filters">
      <div className="dropdown-group">
        <p>Status:</p>
        <Select
          options={['available', 'pending', 'withdrawn', 'adopted'].map(status => ({ value: status, label: status }))}
          isMulti
          value={query.status.map(status => ({ value: status, label: status }))}
          onChange={(selectedOptions) => {
            setSearchParams({
              ...query,
              status: selectedOptions.map(option => option.value),
              page: 1,
            });
          }}
        />
      </div>

      <div className="dropdown-group">
        <p>Gender:</p>
        <Select
          options={['male', 'female'].map(gender => ({ value: gender, label: gender }))}
          isMulti
          value={query.gender.map(gender => ({ value: gender, label: gender }))}
          onChange={(selectedOptions) => {
            setSearchParams({
              ...query,
              gender: selectedOptions.map(option => option.value),
              page: 1,
            });
          }}
        />
      </div>


      <div className="dropdown-group">
        <p>Breeds:</p>
        <Select
          options={uniqueBreeds.map(breed => ({ value: breed, label: breed }))}
          isMulti
          value={query.breed.map(breed => ({ value: breed, label: breed }))}
          onChange={(selectedOptions) => {
            setSearchParams({
              ...query,
              breed: selectedOptions.map(option => option.value),
              page: 1,
            });
          }}
        />
      </div>

      <div className="dropdown-group">
        <p>Shelters:</p>
        <Select
          options={Object.entries(shelterNames).map(([id, name]) => ({ value: id, label: name }))}
          isMulti
          value={query.shelter.map(shelter => ({ value: shelter, label: shelterNames[shelter] }))}
          onChange={(selectedOptions) => {
            setSearchParams({
              ...query,
              shelter: selectedOptions.map(option => option.value),
              page: 1,
            });
          }}
        />
      </div>

      <div className="dropdown-group">
        <p>Sort by:</p>
        <Select
          options={sortOptions}
          isMulti
          value={sortOptions.filter(option => query.sort_by.includes(option.value))}
          onChange={(selectedOptions) => {
            setSearchParams({
              ...query,
              sort_by: selectedOptions.map(option => option.value),
              page: 1,
            });
          }}
        />
      </div>
      </div>
      <div class="large-text text-center p-md-5 p-sm-3">
              Available Pets
            </div>
      <PetCard pets={pets} shelterNames={shelterNames} />
      <p>
        {next !== null ? (
          <Button className="next button" variant="secondary" size="sm"  onClick={() => setSearchParams({ ...query, page: query.page + 1 })}>
            Next
          </Button>
        ) : (
          <></>
        )}
        {query.page > 1 ? (
          <Button className="prev button" variant="secondary" size="sm"  onClick={() => setSearchParams({ ...query, page: query.page - 1 })}>
            Previous
          </Button>
        ) : (
          <></>
        )}
      </p>
    </>
  );
}

export default PetSearchPage;

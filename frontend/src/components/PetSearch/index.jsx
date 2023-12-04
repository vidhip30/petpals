import { useState, useEffect, useMemo } from "react";
import PetCard from "./PetCard";
import { useSearchParams } from "react-router-dom";

import './style.css';
import { getUser } from "../../api/accounts";


function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {
                result.push(`${key}=${value}`);
            }
        }
        else {
            let value = object[key];
            result.push(`${key}=${value}`);
        }
    }
    return result.join('&');
}

function PetSearchPage() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [next, setNext] = useState(true);
    const [ pets, setPets ] = useState([]);
    const [ AllPets, setAllPets ] = useState([]);
    const [shelterNames, setShelterNames] = useState({});
    
    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        search: searchParams.get("search") ?? '',
        status : searchParams.getAll("status") ?? ['available'],
        gender : searchParams.get("gender") ?? [],
        breed: searchParams.getAll("breed") ?? [],
        shelter : searchParams.getAll("shelter") ?? [],
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

        fetch(`http://127.0.0.1:8000/petlistings/?${params}`,{
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
    }, [ query ]);
    
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
    
    return <>
     <p>
            <label>Search Player Name: 
                <input 
                    value={query.search} 
                    onChange={event => setSearchParams({ ...query, search: event.target.value, page: 1})} 
                />
            </label>
        </p>  
        
       <div className="checkbox-group">
    <p>Status:</p>
    {['available', 'pending', 'withdrawn', 'adopted'].map(status => (
        <label key={status}>
           
            <input
                type="checkbox"
                onChange={event => {
                    if (event.target.checked) {
                        setSearchParams({ ...query, status: [...query.status, status], page: 1 });
                    } else {
                        setSearchParams({ ...query, status: query.status.filter(y => y !== status), page: 1 });
                    }
                }}
                checked={query.status.includes(status)}
            />
             {status}
        </label>
    ))}
</div>


        <div className="radio-group">
            <p>Gender:</p>
            {['female','male'].map(gender => (
                <label key={gender}>
                   <input type="radio" 
                    onChange={event => { 
                        if (event.target.checked) { 
                            setSearchParams({...query, gender: gender, page: 1});
                        } 
                        
                    }}
                    checked={query.gender ===gender} />
                     {gender === 'female' ? 'Female' : 'Male'}
                </label>
            ))}
        </div>

      
       
        <div className="checkbox-group">
        <p>Breeds:</p>
        {uniqueBreeds.map((breed) => (
          <label key={breed}>
            <input
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  setSearchParams({
                    ...query,
                    breed: [...query.breed, breed],
                    page: 1,
                  });
                } else {
                  setSearchParams({
                    ...query,
                    breed: query.breed.filter((b) => b !== breed),
                    page: 1,
                  });
                }
              }}
              checked={query.breed.includes(breed)}
            />
            {breed}
          </label>
        ))}
      </div>
        
      <div className="checkbox-group">
        <p>Shelters:</p>
        {Object.entries(shelterNames).map(([id, name])  => (
          <label key={id}>
            <input
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  setSearchParams({
                    ...query,
                    shelter: [...query.shelter, id],
                    page: 1,
                  });
                } else {
                  setSearchParams({
                    ...query,
                    shelter: query.shelter.filter((s) => s !== id),
                    page: 1,
                  });
                }
              }}
              checked={query.shelter.includes(id)}
            />
            {name}
          </label>
        ))}
      </div>

      <div className="checkbox-group">
    <p>Sort by:</p>
    {['name', 'age', 'size'].map(sort_by => (
        <label key={sort_by}>
           
            <input
                type="checkbox"
                onChange={event => {
                    if (event.target.checked) {
                        setSearchParams({ ...query, sort_by: [...query.sort_by, sort_by], page: 1 });
                    } else {
                        setSearchParams({ ...query, sort_by: query.sort_by.filter(y => y !== sort_by), page: 1 });
                    }
                }}
                checked={query.sort_by.includes(sort_by)}
            />
             {sort_by}
        </label>
    ))}
</div>





        <PetCard pets={pets} shelterNames={shelterNames} />
        <p>
        { next !== null
          ? <button onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</button>
          : <></> }
        { query.page > 1 
          ? <button onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</button>
          : <></> }
        </p>
        
    </>;
}

export default PetSearchPage;
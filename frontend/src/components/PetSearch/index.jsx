import { useState, useEffect, useMemo } from "react";
import PetCard from "./PetCard";
import { useSearchParams } from "react-router-dom";

// import './style.css';


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

    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        status : searchParams.getAll("status") ?? [],
        gender : searchParams.get("gender") ?? '',

    }), [searchParams]);
    
    useEffect(() => {
        const params = to_url_params(query);
        fetch(`http://127.0.0.1:8000/petlistings/?${params}`)
        .then(response => response.json())
        .then(json => {
            setPets(json.results);
            setNext(json.next);
          
        });
    }, [ query ]);

    return <>
       <div className="checkbox-group">
    <p>Status:</p>
    {['available', 'pending', 'withdrawn', 'adopted'].map(status => (
        <label key={status}>
            {status}
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
        </label>
    ))}
</div>


        <div className="radio-group">
            <p>Gender:</p>
            {['female','male'].map(gender => (
                <label>
                    {gender === 'female' ? 'Female' : 'Male'}<input type="radio" 
                    onChange={event => { 
                        if (event.target.checked) { 
                            setSearchParams({...query, gender: gender, page: 1});
                        } 
                    }}
                    checked={query.gender ===gender} />
                </label>
            ))}
        </div>
        <PetCard pets={pets} />
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
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import { SearchFormInput,SearchbarContainer,SearchForm ,SearchFormButton } from "./Searchbar.styled";
import { useState } from 'react';


export function Searchbar({queryValue}) {
  const [query, setQuery] = useState('')

  const onChange = e => {
    setQuery(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please enter a search query');
      return;
    };

    queryValue(query);
    reset();
  }
  
    const reset = () => {
      setQuery('')
    }
    
      return (
        <SearchbarContainer>
          <SearchForm onSubmit={handleSubmit}>
            <SearchFormButton type="submit">
                <FcSearch size={24} />
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="query"
              value={query}
              onChange={onChange}
            />
          </SearchForm>
        </SearchbarContainer>
      )
    }
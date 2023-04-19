import { Component } from "react";
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import { SearchFormInput,SearchbarContainer,SearchForm ,SearchFormButton } from "./Searchbar.styled";


export class Searchbar extends Component {
    state = {
        query: '',
    }

    onChange = e => {
        this.setState({ query: e.target.value })
    }

    handleSubmit = e => {
      e.preventDefault();

      if (this.state.query.trim() === '') {
        toast.warn('Please enter a search query');
        return;
      };

      this.props.queryValue(this.state.query);
      this.reset();
      }
    reset = () => {
        this.setState({ query: '' })
    }
    
    render() {
      return (
        <SearchbarContainer>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
                <FcSearch size={24} />
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="query"
              value={this.state.query}
              onChange={this.onChange}
            />
          </SearchForm>
        </SearchbarContainer>
      )
    }
}
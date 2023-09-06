import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchbarHeader,
} from './Searchbar.styled';

export class Searchbar extends Component {
  helperSubmit = evt => {
    evt.preventDefault();
    const serchItem = evt.target.elements.query.value.trim();
    if (!serchItem) {
      toast.error('Enter a search term ');
    }

    this.props.onAdd(serchItem);
    evt.target.reset();
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.helperSubmit} autocomplete="off">
          <SearchFormButton>
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="query"
            type="search"
            autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

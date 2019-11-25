import React from 'react';
import Select from 'react-select';

const optionCitys = [
  { value: 'hanoi', label: 'Hà nội' },
  { value: 'hochiminh', label: 'Hồ Chí Minh' },
];

const optionCountys = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Search extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={optionCitys}
            />
          </div>
          <div class="col-2">
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={optionCountys}
          />
          </div>
          <div class="col-2">
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={optionCountys}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default Search
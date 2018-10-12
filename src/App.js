import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      rowLimiterStart: 0,
      rowLimiterEnd: 3,
      sortBy: 'id',
      sortType: 'asc'
    }
  }

  static defaultProps = {
      showOptions: [1, 2, 3, 5],
      jsonArray:  [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        },
        {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            "geo": {
              "lat": "-68.6102",
              "lng": "-47.0653"
            }
          },
          "phone": "1-463-123-4447",
          "website": "ramiro.info",
          "company": {
            "name": "Romaguera-Jacobson",
            "catchPhrase": "Face to face bifurcated interface",
            "bs": "e-enable strategic applications"
          }
        },
        {
          "id": 4,
          "name": "Patricia Lebsack",
          "username": "Karianne",
          "email": "Julianne.OConner@kory.org",
          "address": {
            "street": "Hoeger Mall",
            "suite": "Apt. 692",
            "city": "South Elvis",
            "zipcode": "53919-4257",
            "geo": {
              "lat": "29.4572",
              "lng": "-164.2990"
            }
          },
          "phone": "493-170-9623 x156",
          "website": "kale.biz",
          "company": {
            "name": "Robel-Corkery",
            "catchPhrase": "Multi-tiered zero tolerance productivity",
            "bs": "transition cutting-edge web services"
          }
        },
        {
          "id": 5,
          "name": "Chelsey Dietrich",
          "username": "Kamren",
          "email": "Lucio_Hettinger@annie.ca",
          "address": {
            "street": "Skiles Walks",
            "suite": "Suite 351",
            "city": "Roscoeview",
            "zipcode": "33263",
            "geo": {
              "lat": "-31.8129",
              "lng": "62.5342"
            }
          },
          "phone": "(254)954-1289",
          "website": "demarco.info",
          "company": {
            "name": "Keebler LLC",
            "catchPhrase": "User-centric fault-tolerant solution",
            "bs": "revolutionize end-to-end systems"
          }
        },
        {
          "id": 6,
          "name": "Mrs. Dennis Schulist",
          "username": "Leopoldo_Corkery",
          "email": "Karley_Dach@jasper.info",
          "address": {
            "street": "Norberto Crossing",
            "suite": "Apt. 950",
            "city": "South Christy",
            "zipcode": "23505-1337",
            "geo": {
              "lat": "-71.4197",
              "lng": "71.7478"
            }
          },
          "phone": "1-477-935-8478 x6430",
          "website": "ola.org",
          "company": {
            "name": "Considine-Lockman",
            "catchPhrase": "Synchronised bottom-line interface",
            "bs": "e-enable innovative applications"
          }
        },
        {
          "id": 7,
          "name": "Kurtis Weissnat",
          "username": "Elwyn.Skiles",
          "email": "Telly.Hoeger@billy.biz",
          "address": {
            "street": "Rex Trail",
            "suite": "Suite 280",
            "city": "Howemouth",
            "zipcode": "58804-1099",
            "geo": {
              "lat": "24.8918",
              "lng": "21.8984"
            }
          },
          "phone": "210.067.6132",
          "website": "elvis.io",
          "company": {
            "name": "Johns Group",
            "catchPhrase": "Configurable multimedia task-force",
            "bs": "generate enterprise e-tailers"
          }
        }
      ]
  }

  rowLimit = () => {
    if(Number(this.refs.rowLimit.value)) {
      this.setState({
        rowLimiterStart: 0, 
        rowLimiterEnd: Number(this.refs.rowLimit.value),
        displayPerPage:  Number(this.refs.rowLimit.value)
      });
      return;
    }
    this.setState({
      rowLimiterStart: 0, 
      rowLimiterEnd: Number(this.refs.rowLimit.value),
      displayPerPage:  this.props.jsonArray.length
    });

  }

  searchBar() {
    this.setState({search: this.refs.searchBar.value});
  }

  paginationHandler(id) {
    const end = Number(this.refs.rowLimit.value) * id;
    const start = end - Number(this.refs.rowLimit.value);

    this.setState({
      rowLimiterStart: start, 
      rowLimiterEnd: end
    });
  }

  // Sorting Columns
  // function for dynamic sorting
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0; 
      }
  
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }



  sorting = (col) => {
    if(this.state.sortBy == col) {
      this.setState({sortType: this.state.sortType =='asc' ? "desc":"asc"})
    } else {
      this.setState({
        sortBy: col,
        sortType: 'asc',
      })
    }
    this.setState({sortType: this.state.sortType =='asc' ? "desc":"asc"})
  }

  render() {
    let returnOptions = this.props.showOptions.map(v=> {
      return (<option key={v} value={v} > {v} </option>)
    })

    this.props.jsonArray.sort(this.compareValues(this.state.sortBy, this.state.sortType));

    // Row Limiter
    let list = this.props.jsonArray.filter((el, index) => {
      if(!this.state.rowLimiterEnd) {
        this.state.rowLimiterEnd = this.props.jsonArray.length;
      } else if(this.state.rowLimiterStart) {
        // console.log(index >= this.state.rowLimiterStart && index <= this.state.rowLimiterEnd);
        console.log(this.state.rowLimiterStart);
        return index >= this.state.rowLimiterStart && index < this.state.rowLimiterEnd;
      }
      return index < this.state.rowLimiterEnd;
      // return index < this.state.rowLimiterEnd;
    });

    // Search Bar
    list  = list.filter(value => {
      return value.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });

    // Pagination
    let pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(this.props.jsonArray.length / this.state.rowLimiterEnd); i++) {
    for (let i = 1; i <= Math.ceil(this.props.jsonArray.length / this.state.displayPerPage); i++) {
      pageNumbers.push(i);
    }

    let pagination = pageNumbers.map(v=> {
      return (<button class="paginate_button" key={v} onClick={this.paginationHandler.bind(this, v)}> {v} </button>)
    })

    let listing = list.map(v => {
      return ( <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.username}</td>
               </tr>
               )
    })

    return (
      <div className="App">
        <h1>App</h1>
        {/* Search: <input ref="searchBar" type="text" onKeyUp={this.searchBar.bind(this)}/> */}
        Search: <input ref="searchBar" type="text" onChange={this.searchBar.bind(this)}/>
        Show: <select ref="rowLimit" onChange={this.rowLimit.bind(this)}> 
          <option key={0} value={0}> All </option>
          {returnOptions} 
        </select>
        <table>
          <thead>
            <tr>
              <th onClick={this.sorting.bind(this, 'id')}>ID</th>
              <th onClick={this.sorting.bind(this, 'name')}>NAME</th>
              <th onClick={this.sorting.bind(this, 'username')}>USERNAME</th>
            </tr>          
          </thead>
          <tbody >{listing}</tbody>
        </table>
        <div>
          Pagination: {pagination}
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Header from './Header';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const largeColumn={width: '40%'};
const midColumn={width: '30%'};
const smallColumn={width: '10%'};

const Button = ({clickAction, label}) =>
  <button onClick={clickAction} type="button">{label}</button>

const Table = ({list,pattern, onDismiss}) =>
  <div className="table">
    {
        list.filter(i => i.title.toLowerCase().startsWith(pattern.toLowerCase())).map(item =>
            <div key={item.objectID} className="table-row">
              <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={midColumn}>{item.author}</span>
              <span style={smallColumn}>{item.num_comments}</span>
              <span style={smallColumn}>{item.points}</span>
              <span style={smallColumn}><Button label="Dismiss" clickAction={() => onDismiss(item.objectID)} className="button-inline"/></span>
          </div>)
    }
  </div>


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount(){
    const {searchTerm} = this.state;
    console.log(`URL: ${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result)).catch(error => console.log(error));
  }

  setSearchTopStories(result)
  {
    this.setState({result});
  }

  onSearchChange(event)
  {
    this.setState({searchTerm:event.target.value});
  }

  onDismiss(id)
  {
    const newList = this.state.list.filter(f => f.objectID !== id);
    this.setState({result: { ...this.state.result, hits: newList}});
  }

  render() {
    const {searchTerm, result} = this.state;
    return (
      <div className="page">
      <Header/>
      <div className="interactions">
      <form>
        <input onChange={this.onSearchChange} value={searchTerm} type="text"/>
        </form>
        </div>
        {
          result && <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>
        }
      
      </div>
    );
  }
}

export default App;

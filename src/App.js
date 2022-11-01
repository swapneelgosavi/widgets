import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Search from './components/Search';
import Route from "./components/Route";
import Header from "./components/Header";

const items = [
    {
        title: 'What is React',
        content: 'React is a front end javascript framework'
    },
    {
        title: 'Why us React',
        content: 'React is a favorite JS library among devs'
    },
    {
        title: 'How do you use React',
        content: 'You use React by creating components'
    }
];

const options = [
    {
        label: 'The Color Red',
        value:'red'
    },
    {
        label: 'The Color Green',
        value:'green'
    },
    {
        label: 'A Shade of Blue',
        value:'blue'
    }
];


const showAccordian = () => {
    if(window.location.pathname === '/'){
      return <Accordion items={items}  />;
    }
}

const showList = () => {
    if(window.location.pathname === '/list'){
      return <Search />;
    }
}

const showDropdown = () => {
    if(window.location.pathname === '/dropdown'){
      return (
        <Dropdown 
           
        />
      );
    }
}

const App = () => {
    const [selected, setSelected] = useState(options[0]);
  
    return (
      <div>
        <Header />
        <Route path="/">
          <Accordion items={items} />
        </Route>
        <Route path="/list">
          <Search />
        </Route>
        <Route path="/dropdown">
          <Dropdown
            label="Select a color"
            options={options}
            selected={selected}
            onSelectedChange={setSelected}
          />
        </Route>      
      </div>
    );
  };
  export default App;
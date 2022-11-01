import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
    
    useEffect(() =>{
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch: term
                }
            }); 
            setResults(data.query.search);
        }

        if(term && !results.length){  //if loop for 1st time loading and avoding 1000 timeout
            search()
        } else {
            const timeoutId = setTimeout(()=>{
                if(term){
                    search();
                }
            }, 1000);
    
            //clean up funtion. This is get called before other code in the useeffct code. i.e. search
            //when renders 2nd time onward
            return () => {
                clearTimeout(timeoutId);
            };
        }
        
    }, [term]); //will run when term changes/updated

    const renderedResults = results.map((result)=> {
        return (
            <div key={result.pageid} className='item'>
                <div className='right floated content'>
                    <a 
                        className='ui button'
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='ui form'>
                <div className='field'> 
                    <label>Enter Search Term</label>
                    <input 
                        value={term}
                        className='input'
                        onChange={e=> setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='ui celled list'>
                {renderedResults}
            </div>
        </div>
    )
};

export default Search;
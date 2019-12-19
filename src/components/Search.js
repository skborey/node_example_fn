import React from 'react';
import { Component } from 'react';
import '../assets/search.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionEmail: null,
            hh: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            mm: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
        }
    }

    render () {

        let filterHH = this.state.hh.map((h, i) => ( <option key={i} value={h}>{ (h/10<1) ? "0"+h: h}</option>));
        let filterMM = this.state.mm.map((m, i) => ( <option key={i} value={m}>{ (m/10<1) ? "0"+m: m}</option>));

        return (
            <form className='search-cls'>
                <div>
                    <input name="search-ipt" placeholder="Find restaurant E.g. Kushi Tsuru" type="text"></input>
                    <button type="submit">Search</button>
                </div>
                <div>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Mon</label>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Tus</label>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Wed</label>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Thu</label>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Fri</label>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Sat</label>
                    <label><input type="checkbox" name="filter-day-ipt" value="Mon" /> Sun</label>
                    <select>{filterHH}</select>:<select>{filterMM}</select>
                    -
                    <select defaultValue="23" >{filterHH}</select>:<select defaultValue="59">{filterMM}</select>
                </div>
            </form>
        );
    }
}
  
export default Search;
import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import VoteNominees from './VoteNominees'
import Admin from './Admin'
import './App.css'

function App(){
return(
    <div className = "app">
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/admin' component = {Admin} />
                <Route exact path = '/vote' component = {VoteNominees}/>
                <Route component = {Home} />
            </Switch>
        </BrowserRouter>
    </div>
)  
}
export default App
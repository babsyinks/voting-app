import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import VoteNominees from './VoteNominees'
import Admin from './Admin'
import NotFound from './NotFound'
import './App.css'

function App(){
return(
    <div className = "app">
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' render = {(props)=> <Home toVote = {true} {...props} />} />
                <Route exact path = '/info' render = {(props)=> <Home toVote = {false} {...props} />} />
                <Route exact path = '/admin' component = {Admin} />
                <Route exact path = '/vote' component = {VoteNominees}/>
                <Route component = {NotFound} />
            </Switch> 
        </BrowserRouter>
    </div>
)  
}
export default App
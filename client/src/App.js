import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import VoteNominees from './VoteNominees'
import Admin from './Admin'
<<<<<<< HEAD
import NotFound from './NotFound'
=======
>>>>>>> 9d173ad383c7f6ebfc5b048150f3dbd3a8cf23e9
import './App.css'

function App(){
return(
    <div className = "app">
        <BrowserRouter>
            <Switch>
<<<<<<< HEAD
                <Route exact path = '/' render = {(props)=> <Home toVote = {true} {...props} />} />
                <Route exact path = '/info' render = {(props)=> <Home toVote = {false} {...props} />} />
                <Route exact path = '/admin' component = {Admin} />
                <Route exact path = '/vote' component = {VoteNominees}/>
                <Route component = {NotFound} />
            </Switch> 
=======
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/admin' component = {Admin} />
                <Route exact path = '/vote' component = {VoteNominees}/>
                <Route component = {Home} />
            </Switch>
>>>>>>> 9d173ad383c7f6ebfc5b048150f3dbd3a8cf23e9
        </BrowserRouter>
    </div>
)  
}
export default App
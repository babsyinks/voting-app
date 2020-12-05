import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import './App.css'



function App(){
return(

    <div className = "app">
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' component = {Home} />
                <Route component = {Home} />
            </Switch>
        </BrowserRouter>
    </div>
)  
    

}
export default App
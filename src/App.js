import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout'
import SeriesList from './containers/SeriesList/SeriesList'

function App() {
  return (
    <div>
        <Layout>
            <SeriesList/>
        </Layout>
    </div>
  );
}

export default App;

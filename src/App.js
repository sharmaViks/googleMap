import { useState } from 'react';
import CustomAutoComplete from './components/customAutoComplete';
import GoogleMap from './components/googleMap';

function App() {
  const [placeName, setPlaceName] = useState('');
  return (
    <div style={{display:'flex',flexDirection:'column',margin:20}}>
      {/* CustomAutoComplete component */}
      <CustomAutoComplete handleSelectedPlace={(place) => setPlaceName(place)} />
      {/* Google Map Component */}
      <GoogleMap placeName={placeName}/>
    </div>
  );
}

export default App;

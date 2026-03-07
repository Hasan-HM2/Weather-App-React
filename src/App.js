import './App.css';

// React
import { useEffect, useState } from 'react'

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Material Icons
import CloudIcon from '@mui/icons-material/Cloud';

// Libreries
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
});

let cancelAxios = null

function App() {
  const [temp, setTemp] = useState(null)
  const [maxTemp, setMaxTemp] = useState(null)
  const [minTemp, setMinTemp] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35.29&lon=36.04&appid=84a13e10c6abc34071a954d4e4dd06db', 
      {
        cancelToken: new axios.CancelToken((c)=> {
          cancelAxios = c
        })
      }
    )
      .then((response) => {
        const responseTemp = Math.round(response.data.main.temp - 272.15)
        setTemp(responseTemp)

        const responseMaxTemp = Math.round(response.data.main.temp_max - 272.15)
        setMaxTemp(responseMaxTemp)

        const responseMinTemp = Math.round(response.data.main.temp_min - 272.15)
        setMinTemp(responseMinTemp)

        const responseDescription = response.data.weather[0].description
        setDescription(responseDescription)
      })
      .catch((error) => {
        console.log(error);
      })

    return () => {
      cancelAxios()
    }
  }, [])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column'
          }}>

            {/* Card */}
            <div className='card'>
              {/* Content */}
              <div>
                {/* CITY & TIME */}
                <div className='city-time' style={{ direction: 'rtl', display: 'flex', alignItems: 'end', gap: '20px' }}>
                  <Typography variant="h2" style={{ fontWeight: '600' }} >
                    جبلة
                  </Typography>
                  <Typography variant="h5" >
                    السبت 21/2/2026
                  </Typography>
                </div>
                {/* ==== CITY & TIME ==== */}

                <hr />

                {/* DEGREE & DESCRIPITON */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl' }}>

                  {/* TEMPRETURE */}
                  <div>
                    <Typography variant="h1" style={{ textAlign: 'right' }}>
                      {temp}
                    </Typography>
                    {/* TODO: TEMP IMAGE */}

                    {/* === TEMPRETURE ==== */}
                    <Typography variant="h5" style={{ textAlign: 'right' }}>
                      {description}
                    </Typography>

                    <Typography variant="h7" style={{ textAlign: 'right' }}>
                      الصغرى: {minTemp} | الكبرى: {maxTemp}
                    </Typography>
                  </div>

                  {/* ICON */}
                  <div>
                    <CloudIcon style={{ fontSize: '220px' }} />
                  </div>
                  {/* ==== ICON ==== */}
                </div>
                {/* ==== DEGREE & DESCRIPITON ==== */}

              </div>
              {/* ==== Content ==== */}
            </div>
            {/* ==== Card ==== */}

            {/* TRANSLATION BUTTON */}
            <div style={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              width: '100%',
              marginTop: '20px'
            }}>
              <Button variant="text" style={{ color: 'white', fontSize: '18px' }}>انكليزي</Button>
            </div>
            {/* ==== TRANSLATION BUTTON ==== */}

          </div>
          {/* ===== CONTENT CONTAINER ==== */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

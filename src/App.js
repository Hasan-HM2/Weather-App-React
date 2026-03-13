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
import { useTranslation } from 'react-i18next';
import 'moment/min/locales'
import moment from 'moment';

// Theme
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
});

let cancelAxios = null

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('ar')
  const [dateAndTime, setDateAndTime] = useState("")
  const [weather, setWeather] = useState({
    temp: null,
    maxTemp: null,
    minTemp: null,
    description: "",
    icon: null
  })
  moment.locale('ar')

  // handle language translate function
  function handleTranslate() {
    if (language === 'en') {
      setLanguage('ar')
      i18n.changeLanguage("ar")
      moment.locale('ar')
      setDateAndTime(moment().format("dddd, YYYY/MM/DD, mm:h a"))

    }
    else if (language === 'ar') {
      setLanguage('en')
      i18n.changeLanguage("en")
      moment.locale('en')
      setDateAndTime(moment().format("dddd, DD/MM/YYYY, h:mm a"))
    }

  }
  // == handle language translate function == 
  useEffect(() => {
    setDateAndTime(moment().format("dddd, YYYY/MM/DD, mm:h a"))
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=35.29&lon=36.04&appid=${apiKey}`,
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c
        })
      }
    )
      .then((response) => {
        const responseTemp = Math.round(response.data.main.temp - 272.15)
        const responseMaxTemp = Math.round(response.data.main.temp_max - 272.15)
        const responseMinTemp = Math.round(response.data.main.temp_min - 272.15)
        const responseDescription = response.data.weather[0].description
        const responseIcon = response.data.weather[0].icon

        setWeather({
          temp: responseTemp,
          maxTemp: responseMaxTemp,
          minTemp: responseMinTemp,
          description: responseDescription,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`
        })
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
            flexDirection: 'column',
          }}>

            {/* Card */}
            <div className='card'>
              {/* Content */}
              <div>
                {/* CITY & TIME */}
                <div className='city-time' style={{ direction: language === 'ar' ? 'rtl' : 'ltr', display: 'flex', alignItems: 'end', gap: '20px' }}>
                  <Typography variant="h2" style={{ fontWeight: '600' }} >
                    {t("Jableh")}
                  </Typography>
                  <Typography variant="h6" >
                    {dateAndTime}
                  </Typography>
                </div>
                {/* ==== CITY & TIME ==== */}

                <hr />

                {/* DEGREE & DESCRIPITON */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: language === 'ar' ? 'rtl' : 'ltr' }}>

                  {/* TEMPRETURE */}
                  <div>
                    <div className='Temp' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h1" style={{ textAlign: 'right' }}>
                        {weather.temp}
                      </Typography>

                      <img className='weatherIcon' src={weather.icon} alt="weather icon" />
                    </div>
                    {/* === TEMPRETURE ==== */}
                    <Typography variant="h5" style={{ textAlign: 'right' }}>
                      {t(weather.description)}
                    </Typography>

                    {/* MIN & MAX */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h5>{t("min")}: {weather.minTemp}</h5>
                      <h5> | </h5>
                      <h5>{t('max')}: {weather.maxTemp}</h5>
                    </div>
                    {/* ===MIN & MAX=== */}

                  </div>

                  {/* ICON */}
                  <div>
                    <CloudIcon className='CloudIcon' style={{ fontSize: '220px' }} />
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
              <Button variant="text" style={{ color: 'white', fontSize: '18px' }} onClick={handleTranslate}>
                {language === 'en' ? "Arabic" : "إنكليزي"}
              </Button>
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

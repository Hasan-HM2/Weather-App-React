import './App.css';

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Material Icons
import CloudIcon from '@mui/icons-material/Cloud';

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
});

function App() {
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
                      16
                    </Typography>
                    {/* TODO: TEMP IMAGE */}

                    {/* === TEMPRETURE ==== */}
                    <Typography variant="h5" style={{ textAlign: 'right' }}>
                      غائم جزئياً
                    </Typography>

                    <Typography variant="h7" style={{ textAlign: 'right' }}>
                      الصغرى: 10 | الكبرى: 16
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

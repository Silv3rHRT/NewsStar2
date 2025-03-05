import { useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error('🚨 OH NO! ERROR ALERT 🚨', error);

  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/sad-trombone.mp3');
    const playAudio = () => {
      audio.play().catch(() => {
        console.warn('Autoplay blocked! Click to enable audio.');
        setAudioBlocked(true);
      });
    };

    playAudio();
    const timeoutId = setTimeout(playAudio, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="container text-center py-5 bg-danger text-white rounded shadow-lg border border-warning border-5 position-relative overflow-hidden">
      <h1 className="display-3 fw-bold text-uppercase text-warning animate__animated animate__flash animate__infinite">⚠️ WHOOPSIE DAISY! ⚠️</h1>
      <p className="fs-4 text-light bg-dark p-2 d-inline-block rounded animate__animated animate__pulse animate__infinite">Congratulations! 🎉 You have officially broken the internet.</p>
      <p className="fs-5 text-warning fw-bold animate__animated animate__shakeX animate__infinite"> 
        (╯°□°）╯︵ ┻━┻ <br />
        We don't know what happened, but it definitely wasn't our fault. Probably. 
      </p>
      <div className="d-flex justify-content-center mt-4">
        <pre className="fs-5 bg-light text-dark p-3 rounded border shadow text-center w-50 animate__animated animate__wobble animate__infinite">
          {`
          ／＼_/＼
         ( o.o )
          > ^ <  
          ERROR CAT SAYS NO.
          `}
        </pre>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <pre className="fs-5 bg-light text-dark p-3 rounded border shadow text-center w-50 animate__animated animate__bounce animate__infinite">
          {`
          (╯°□°）╯︵ ʞɔɐH 
          SYSTEM MELTDOWN IMMINENT!
          `}
        </pre>
      </div>
      <p className="fs-5 fst-italic text-light mt-4 bg-dark p-2 d-inline-block rounded animate__animated animate__heartBeat animate__infinite">
        {error.statusText || error.message || "Mystery Error! Just pretend it's an Easter egg."}
      </p>
      {audioBlocked && (
        <div className="d-flex justify-content-center">
          <button 
            className="btn btn-info btn-lg mt-3 fw-bold shadow-lg mx-2 animate__animated animate__rubberBand animate__infinite"
            onClick={() => {
              const audio = new Audio('https://www.myinstants.com/media/sounds/sad-trombone.mp3');
              audio.play().catch(() => console.warn('Audio play failed.'));
            }}
          >
            Play Sad Trombone Sound 🎺
          </button>
        </div>
      )}
      <div className="d-flex justify-content-center mt-3">
        <button 
          className="btn btn-warning btn-lg fw-bold shadow-lg mx-2 animate__animated animate__tada animate__infinite"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Take me home, country roads 🏡
        </button>
      </div>
      <div className="position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center text-danger fw-bold fs-1 animate__animated animate__fadeIn animate__infinite" style={{ pointerEvents: 'none', opacity: 0.2 }}>
        SYSTEM FAILURE DETECTED!!!
      </div>
    </div>
  );
}
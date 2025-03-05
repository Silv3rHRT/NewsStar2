import { useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

    // Attempt to play the audio as soon as possible
    playAudio();

    // Fallback to play after a delay
    const timeoutId = setTimeout(playAudio, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div id="error-page" style={{ textAlign: 'center', padding: '50px', fontFamily: 'Comic Sans MS, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', color: 'red' }}>⚠️ WHOOPSIE DAISY! ⚠️</h1>
      <p style={{ fontSize: '1.5rem' }}>Congratulations! 🎉 You have officially broken the internet. </p>
      <p style={{ fontSize: '1.2rem' }}> 
        (╯°□°）╯︵ ┻━┻ <br />
        We don't know what happened, but it definitely wasn't our fault. Probably. 
      </p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <pre style={{ fontSize: '1rem', lineHeight: '1.5', fontFamily: 'monospace', background: '#f8f8f8', padding: '10px', display: 'inline-block', textAlign: 'center' }}>
          {`
          ／＼_/＼
         ( o.o )
          > ^ <  
          ERROR CAT SAYS NO.
          `}
        </pre>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <pre style={{ fontSize: '1rem', lineHeight: '1.5', fontFamily: 'monospace', background: '#f8f8f8', padding: '10px', display: 'inline-block', textAlign: 'center' }}>
          {`
          (╯°□°）╯︵ ʞɔɐH 
          SYSTEM MELTDOWN IMMINENT!
          `}
        </pre>
      </div>
      <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
        {error.statusText || error.message || "Mystery Error! Just pretend it's an Easter egg."}
      </p>
      {audioBlocked && (
        <button 
          style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', cursor: 'pointer' }}
          onClick={() => {
            const audio = new Audio('https://www.myinstants.com/media/sounds/sad-trombone.mp3');
            audio.play().catch(() => console.warn('Audio play failed.'));
          }}
        >
          Play Sad Trombone Sound 🎺
        </button>
      )}
      <button 
        style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', cursor: 'pointer' }}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Take me home, country roads 🏡
      </button>
    </div>
  );
}
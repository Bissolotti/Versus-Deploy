import { supabase } from './supabaseClient';

export async function sendVote(option: string) {
  try {
    const response = await fetch(
      'https://yacepzzieccdhiqgooyc.supabase.co/functions/vote',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option }),
      }
    );

    const data = await response.json();
    console.log('Vote response:', data);

    if (response.ok) {
      alert('Voto registrado com sucesso!');
    } else {
      alert('Erro ao registrar voto: ' + data.message);
    }
  } catch (error) {
    console.error('Erro ao enviar voto:', error);
    alert('Erro ao enviar voto. Veja o console.');
  }
}

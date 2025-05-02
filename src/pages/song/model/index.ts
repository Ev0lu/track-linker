import { createEvent, createStore, sample, createEffect } from 'effector';

export const fetchSong = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`https://tracklinker.ru/api/v1/music/${id}`);
    
    if (!response.ok) {
      throw new Error('Error fetching song');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Error fetching song');
    }
    throw new Error('Error fetching song');
  }
};

export const findSongByLink = async (link: string): Promise<any> => {
  try {
    const response = await fetch('https://tracklinker.ru/api/v1/music/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link }),
    });

    if (!response.ok) {
      throw new Error('Error finding song');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Error finding song');
    }
    throw new Error('Error finding song');
  }
};

export const setSongId = createEvent<string>();
export const setAudioUrl = createEvent<string>();
export const submitSongLink = createEvent<string>();

const fetchSongEffect = createEffect({
  handler: fetchSong,
});

const findSongByLinkEffect = createEffect({
  handler: findSongByLink,
});

export const $song = createStore<any>(null)
  .on(fetchSongEffect.doneData, (_, data) => data)
  .on(findSongByLinkEffect.doneData, (_, data) => data);

export const $error = createStore<string | null>(null)
  .on(fetchSongEffect.fail, (_, error) => error.error.message)
  .on(findSongByLinkEffect.fail, (_, error) => error.error.message);

sample({
  clock: setSongId,
  target: fetchSongEffect,
});

sample({
  clock: submitSongLink,
  target: findSongByLinkEffect,
});



export type tSong = {
  full_title: string;
  title: string;
  url: string;
  id: number;
  primary_artist: tArtist;
  header_image_thumbnail_url: string;
  header_image_url: string;
  song_art_image_url: string;
  stats: {
    pageviews: number;
  };
};

export type tArtist = {
  id: number;
  name: string;
  url: string;
  image_url: string;
};

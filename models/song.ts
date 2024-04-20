export interface Song {
  id: string;
  user_id: string;
  title: string;
  author: string;
  song_path: string;
  image_path: string;
  liked?: boolean;
}

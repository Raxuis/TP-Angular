export type RickAndMortyCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  image: string;
  gender: string;
  url: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  }
}

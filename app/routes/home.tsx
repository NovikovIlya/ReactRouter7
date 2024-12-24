import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useFetcher } from "react-router";
import { json } from "stream/consumers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function loader() {
  return { message: "Hello, world!" };
}
export const action = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemons = await response.json();
  return (pokemons);
};


export default function Home({loaderData}) {
  const fetcher = useFetcher();
  return <>
    <Welcome />
    <h1>{loaderData.message}</h1>
    <fetcher.Form method="post">
              <button type="submit">Загрузить покемонов</button>
          </fetcher.Form>
          {fetcher.data && (
              <ul>
                  {fetcher.data.results.map((pokemon:any) => (
                      <li key={pokemon.name}>{pokemon.name}</li>
                  ))}
              </ul>
          )}
    </>;
}

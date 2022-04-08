import React, { useEffect, useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import axios from 'axios';
import CardList from './components/CardList';

import Scroll from './components/Scroll';
// import { ReactQueryDevtools } from 'react-query-devtools';

import './App.css';

export interface IPokemon {
  name: string;
  id: number;
  sprites: any;
}

interface IAppProps {
}

interface IAppState {
  pokemons?: Array<IPokemon>;

}

const fetchPokemons = async (page: string) => {
  const res = await axios(page);

  console.log(res.data)
  return res.data;

};

const fetchPokemon = async (pokemon: any) => {
  const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

  return res;
};




// const useQueryFetch = async () => {
//   const { data, status } = await useQuery('pokemons', fetchPokemons);
//   // console.log(data);
//   return (data)
// }

const App: React.SFC<IAppState> = () => {

  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loadMore, setLoadMore] = useState<String>("");



  const onError = () => {
    console.log("errooor")
  }

  // const [data, setData] = useState([]);

  // useGueryFetch().then((data) => { console.log(data); });
  const {
    data,
    status,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,

  } = useInfiniteQuery(
    'pokemons',
    ({ pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=20' }) => fetchPokemons(pageParam),
    {
      onSuccess: (data: any) => {
        // var localpokemons: Array<IPokemon>;
        setLoadMore(data.pages[data.pages.length - 1].next);
        console.log(data)
        data.pages[data.pages.length - 1].results.forEach(function (pokemon: any) {

          fetchPokemon(pokemon)
            .then((res: any) => {
              // console.log(res.data.name)
              // var localpokemons: Array<IPokemon>;
              // localpokemons = pokemons;
              // localpokemons.concat([res.data]);
              setPokemons((currentPokemons) => [...currentPokemons, res.data]);
              // setPokemons(pokemons => {

              //   return pokemons.concat([res.data])
              // });
              // console.log("pokemons", pokemons)
              // console.log(res.data)
            });

        })
      },
      onError,
      getNextPageParam: (lastPage, allPages) => {
        // console.log(loadMore)
        // console.log('lastPage', lastPage, 'allPages', allPages);
        return lastPage.next;
      },
    });

  // console.log(data);

  // data.results.forEach(function (value: any) {
  //   console.log(data);
  // });

  useEffect(() => {
    console.log("aaaaaaaaaaaaaaa")
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        console.log(hasNextPage);
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }

  else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>

        {/* <Scroll> */}
        <CardList key={"CardList"} pokemons={pokemons} />
        {/* </Scroll> */}
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
    );
  }
  // return !pokemons.length ?
  //   <h1>Loading</h1> :
  //   (
  //     <div className='tc'>
  //       <h1 className='f1'>RoboFriends</h1>

  //       <Scroll>
  //         <CardList pokemons={pokemons} />
  //       </Scroll>
  //     </div>
  //   );
}


export default App;
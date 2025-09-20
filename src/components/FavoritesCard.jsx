import { useSelector, useDispatch } from "react-redux";
import { favoritesActions } from "../store/Favorites-Slice";

export default function FavoritesCard() {
  const dispatch = useDispatch();
  const favoritesItems = useSelector((state) => state.favorites.favoriteItems);

  const totalLikedItems = useSelector(
    (state) => state.favorites.totalLikedItems
  );

  function handleRemoveFromFavorites(itemId) {
    dispatch(favoritesActions.toggleFavorite({ id: itemId }));
  }

  return (
    <>
      {totalLikedItems === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-500 text-2xl font-bold">No liked items</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-5 mx-55">Liked Items</h1>
          {favoritesItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center my-5 mx-55 bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={`http://localhost:3000/${item.image}`}
                alt={item.title}
              />

              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.date} @ {item.time}
                </p>
              </div>

              <button 
                onClick={() => handleRemoveFromFavorites(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white mx-2 px-4 py-2 rounded-md transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
}



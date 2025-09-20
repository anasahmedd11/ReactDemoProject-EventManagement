import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../store/Favorites-Slice";

export default function EventItem({ event }) {

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const dispatch = useDispatch();

  function addToFavorites() {
    dispatch(
      favoritesActions.toggleFavorite({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        image: event.image,
      })
    );
  }

  const isLiked = useSelector((state) => 
    state.favorites.favoriteItems.some((item) => item.id === event.id)
  );

  return (
    <article className="h-full my-8 p-0 rounded bg-[#3c4249] shadow-[0_2px_8px_rgba(0,0,0,0.26)] overflow-hidden flex flex-col gap-4 w-80">
      <img
        src={`http://localhost:3000/${event.image}`}
        alt={event.title}
        className="w-full object-cover"
      />
      <div className="h-full p-4 text-center flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold m-0 text-[#d7bfcb]">
            {event.title}
          </h2>
          <p className="my-2 text-sm font-semibold">{formattedDate}</p>
          <p className="my-2 text-base font-[Quicksand]">{event.location}</p>
        </div>
        <p className="flex justify-between">
          <Link
            to={`/events/${event.id}`}
            className="inline-block rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            View Details
          </Link>

          <button onClick={addToFavorites} className="inline-block rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
            {isLiked ? "Unlike" : "Like"}
          </button>
        </p>
      </div>
    </article>
  );
}

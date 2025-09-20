import meetupImg from "../assets/meetup.jpg";
import { Link } from "react-router-dom";

export default function EventsHeader() {
  return (
    <section
      id="overview-section"
      className="mb-24 px-[15%] h-[80vh] bg-cover bg-center bg-no-repeat flex items-center"
      style={{ backgroundImage: `url(${meetupImg})` }}
    >
      <div className="w-full text-center -mt-55">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Connect with amazing people <br />
          or <span className="text-pink-500">find a new passion</span>
        </h1>
        <div className="mt-6">
          <Link
            to="/events/new"
            className="inline-block rounded-lg bg-pink-600 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Create your first event
          </Link>
        </div>
      </div>
    </section>
  );
}

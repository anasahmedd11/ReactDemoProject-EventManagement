import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../util/http';
import LoadingIndicator from './UI/LoadingIndicator';
import ErrorBlock from './UI/ErrorBlock';
import EventItem from './EventItem';

export default function NewEventsSection() {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(), 
  })
 
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events'} />
    );
  }

  if (data) {
    content = (
      <ul className="max-w-[60rem] grid [grid-template-columns:repeat(auto-fill,minmax(15rem,1fr))] gap-12">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="mt-12 mb-24 px-[15%]" id="new-events-section">
      <h2 className="my-8 text-2xl font-[Quicksand] text-[#b6cad5]">Recently added events</h2>
      {content}
    </section>
  );
}

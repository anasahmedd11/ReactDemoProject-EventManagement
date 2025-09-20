import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent, updateEvent } from '../util/http';
import LoadingIndicator from './UI/LoadingIndicator';
import ErrorBlock from "./UI/ErrorBlock.jsx";
import { queryClient } from "../util/http.js";
import { useState } from "react";
import Modal from "./UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

export default function EventDetails() {
  const params = useParams();
  const id = params.eventId;
  const navigate = useNavigate();

  const [isDeleteStarted, setIsDeleteStarted] = useState(false);
  const [isEditStarted, setIsEditStarted] = useState(false);

  const {
    data,
    isPending: isPendingEvent,
    isError: isErrorEvent,
    error: errorEvent,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });

  const {
    mutate: mutateDelete,
    isPending: isPendingDelete,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
    },
  });

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: (eventData) => updateEvent(id, eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      setIsEditStarted(false);
    },
  });

  function handleStartDelete() {
    setIsDeleteStarted(true);
  }

  function handleStopDelete() {
    setIsDeleteStarted(false);
  }

  function handleDelete() {
    mutateDelete();
  }

  function handleStartEdit() {
    setIsEditStarted(true);
  }

  function handleStopEdit() {
    setIsEditStarted(false);
  }

  function handleSubmit(formData) {
    mutateUpdate({ event: formData });
  }

  if (isPendingEvent) {
    return (
        <LoadingIndicator />
    );
  }

  if (isErrorEvent) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={errorEvent.info?.message || "Failed to fetch event"}
      />
    );
  }

  if (!data) {
    return (
      <ErrorBlock title="An error occurred" message="Failed to fetch event" />
    );
  }

  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {isDeleteStarted && (
        <Modal onClose={handleStopDelete}>
          <h2 className="text-2xl font-bold text-black">Are you sure?</h2>
          <p className="text-lg font-bold text-black">
            This action cannot be undone and will permanently remove the event.
          </p>
          <div className="flex justify-end gap-4 mt-4">
            {isPendingDelete && <p className="text-gray-500 font-semibold">Deleting, please wait...</p>}
            {!isPendingDelete && (
              <>
                <button onClick={handleStopDelete} className="bg-transparent text-gray-700 border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-gray-100">
                  Cancel
                </button>
                <button onClick={handleDelete} className="bg-pink-500 text-white border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                  Delete
                </button>
              </>
            )}
          </div>
          {isDeleteError && (
            <div>
              <ErrorBlock
                title="Delete failed"
                message={deleteError?.info?.message || deleteError?.message}
              />
            </div>
          )}
        </Modal>
      )}
      {isEditStarted && (
        <Modal onClose={handleStopEdit}>
          <EventForm inputData={data} onSubmit={handleSubmit}>
            <button type="button" onClick={handleStopEdit} className="bg-transparent text-gray-700 border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="bg-pink-500 text-white border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={isPendingUpdate}>
              {isPendingUpdate ? "Updating..." : "Update"}
            </button>
          </EventForm>
          {isUpdateError && (
            <ErrorBlock
              title="Update failed"
              message={updateError?.info?.message || updateError?.message}
            />
          )}
        </Modal>
      )}
      <Outlet />
    
      <article>
        <header className="w-[40rem] mx-auto my-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <nav className="flex gap-4">
            <button onClick={handleStartDelete} className="font-inherit cursor-pointer border-none bg-transparent text-[#b6cad5] rounded font-bold no-underline p-1">Delete</button>
            <button onClick={handleStartEdit} className="font-inherit cursor-pointer border-none bg-transparent text-[#b6cad5] rounded font-bold no-underline p-1">Edit</button>
          </nav>
        </header>
        <div className="w-[40rem] mx-auto my-8 bg-[#343b3f] rounded-lg overflow-hidden">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} className="w-full h-80 object-cover mb-8" />
          <div className="px-12 pb-12">
            <div>
              <p className="text-lg text-[#b6cad5] font-bold m-0">{data.location}</p>
              <time className="text-2xl my-2 block">
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p className="text-xl leading-8 text-[#b6cad5]">{data.description}</p>
          </div>
        </div>
      </article>
    </>
  );
}

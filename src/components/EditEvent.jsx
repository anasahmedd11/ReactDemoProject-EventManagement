import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "./UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../util/http";
import LoadingIndicator from './UI/LoadingIndicator';
import ErrorBlock from "./UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.eventId;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });

  const { mutate, isPending: isUpdating, isError: isUpdateError, error: updateError } = useMutation({
    mutationFn: (eventData) => updateEvent(id, eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      navigate("../");
    },
  });

  let content;

  if (isPending) {
    content = (
        <LoadingIndicator />
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to fetch event"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Ok
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <>
        <EventForm inputData={data} onSubmit={handleSubmit}>
          <Link to="../" className="bg-transparent text-gray-700 border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-gray-100">
            Cancel
          </Link>
          <button type="submit" className="bg-pink-500 text-white border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </EventForm>
        {isUpdateError && (
          <ErrorBlock
            title="Update failed"
            message={updateError.info?.message || "Could not update event"}
          />
        )}
      </>
    );
  }

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      {content}
    </Modal>
  );
}

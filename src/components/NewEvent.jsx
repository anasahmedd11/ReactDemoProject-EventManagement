import { Link, useNavigate } from "react-router-dom";
import Modal from "./UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "./UI/ErrorBlock.jsx";
import { useMutation } from "@tanstack/react-query";
import { createEvent, queryClient } from "../util/http";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createEvent, 

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("../");
    }

  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Creating event...</p>}
        {!isPending && (
          <>
            <Link to="../" className="bg-transparent text-gray-700 border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-gray-100">
              Cancel
            </Link>
            <button type="submit" className="bg-pink-500 text-white border-none px-6 py-3 font-semibold text-sm cursor-pointer rounded-md transition-colors hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to create event"}
        />
      )}
    </Modal>
  );
}


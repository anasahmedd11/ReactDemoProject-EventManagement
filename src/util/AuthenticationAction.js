import { auth } from "./firebaseConfig";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { redirect } from "react-router-dom";

export async function AuthenticationAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Invalid mode." }), {
      status: 422,
    });
  }

  const data = await request.formData();

  const email = data.get("email");
  const password = data.get("password");

  try {
    if (mode === "login") {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    return redirect("/");
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
    });
  }
}

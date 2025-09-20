import AuthForm from "../components/AuthForm";

export default function Authentication() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <AuthForm />
      </div>
    </section>
  );
}
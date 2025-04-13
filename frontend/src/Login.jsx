import React from "react";

export default function Login({onLogin}) {

  const [form, setform] = React.useState({
    username: "",
    password: "",
  });
  const [error, seterror] = React.useState({});

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        onLogin(form.username);

      } else {
        seterror(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-xl">
        <div className="w-full p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Finzarc
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
           
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                username
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleChange}
                value={form.username}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                placeholder="**********"
                required
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

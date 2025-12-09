import React from 'react';

function Home() {
  return (
    <section
      className="relative w-[120%] min-h-screen bg-cover bg-center overflow-hidden "
      style={{ backgroundImage: "url('/photo1.jpg')" }}
    >
      <h1 className="text-white text-4xl p-10">Home</h1>
    </section>
  );
}

export default Home;
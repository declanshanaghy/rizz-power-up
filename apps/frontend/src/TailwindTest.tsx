function TailwindTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-rizz-dark text-rizz-light">
      <div className="max-w-md w-full">
        <h1 className="text-3xl text-center font-display text-rizz-pink mb-4 text-shadow-neon">
          ⚡ RIZZ POWER-UP SIMULATOR
        </h1>
        
        <div className="italic p-4 border-l-4 border-rizz-blue bg-opacity-5 bg-white mb-6">
          <p className="text-rizz-cyan">"Your aura just disrupted the algorithm."</p>
        </div>
        
        <div className="flex justify-center my-6">
          <button className="bg-gradient-neon text-white font-bold py-4 px-8 rounded-full shadow-neon-pink text-shadow-neon transform transition hover:scale-105 active:scale-95">
            🔥 TAP TO RIZZ UP 🔥
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm bg-rizz-gray-800 p-4 rounded-lg">
          <div>🚀 <strong>Rizz Level:</strong> <span className="text-rizz-yellow">1234</span></div>
          <div>🌊 <strong>Vibe Level:</strong> <span className="text-rizz-cyan">71</span></div>
          <div>😎 <strong>Swagger:</strong> <span className="text-rizz-blue">88</span></div>
          <div>🧠 <strong>Cringe Avoidance:</strong> <span className="text-rizz-purple">42</span></div>
        </div>
        
        <div className="mt-4 bg-rizz-purple bg-opacity-70 text-center text-rizz-yellow p-3 rounded-lg">
          ✨ Sigma Surge Activated! ✨
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-sm text-rizz-gray-400 hover:text-rizz-pink">☰ Open Menu</button>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest;
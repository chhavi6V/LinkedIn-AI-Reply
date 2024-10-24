import StartButton from "./StartButton";

function App() {
  return (
    <>
      <div className="Main-wrapper w-80 py-6 px-5 bg-light_gray text-center shadow-lg rounded-lg">
        <h1 className="text-3xl text-center text-deep_sky_blue font-semibold mb-2">
            LinkedIn AI Reply
        </h1>
        {/* deep_sky_blue is a custom color from tailwind.config.js */}
        <p className="text-lg text-dark_gray">
          Experience a streamlined way to craft quick, smart replies for your
          LinkedIn messages, powered by AI. This Chrome extension is designed to
          simplify your communication.
          <span className="block font-semibold my-2 text-warning">
            (To begin, just click on the message input field!)
          </span>
        </p>
        <StartButton />
      </div>
    </>
  );
}

export default App;

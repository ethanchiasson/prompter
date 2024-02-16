
import Teleprompter from "./components/Teleprompter";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Teleprompter
        initialText={"It is a period of civil wars in the galaxy. A brave alliance of underground freedom fighters has challenged the tyranny and oppression of the awesome GALACTIC EMPIRE.\n\nStriking from a fortress hidden among the billion stars of the galaxy, rebel spaceships have won their first victory in a battle with the powerful Imperial Starfleet.\n\nThe EMPIRE fears that another defeat could bring a thousand more solar systems into the rebellion, and Imperial control over the galaxy would be lost forever.\n To crush the rebellion once and for all, the EMPIRE is constructing a sinister new battle station.\n\nPowerful enough to destroy an entire planet, its completion spells certain doom for the champions of freedom."}
        speed={30}
      />
    </main>
  );
};

export default Home;

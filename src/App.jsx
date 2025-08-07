import React, { useRef, useEffect, useState } from 'react'



const TopBar = ({ scrollToSection, section1Ref, section2Ref, section3Ref }) => {
  return (
    <div className="top-bar sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 text-sky-700 p-4 shadow-md flex gap-4 justify-center">
      <button
        onClick={() => scrollToSection(section1Ref)}
        className="px-4 py-2 rounded hover:bg-sky-100 transition font-semibold"
      >
        Головна
      </button>
      <button
        onClick={() => scrollToSection(section2Ref)}
        className="px-4 py-2 rounded hover:bg-sky-100 transition font-semibold"
      >
        Статистика
      </button>
      <button
        onClick={() => scrollToSection(section3Ref)}
        className="px-4 py-2 rounded hover:bg-sky-100 transition font-semibold"
      >
        Про проєкт
      </button>
    </div>
  )
}

const Home = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center">
      <img src="public/Orest.png" alt="Orest" className="mb-6 rounded-full w-36 h-36 object-cover border-4 border-sky-300 shadow" />
      <div className="text-sky-800 font-serif">
        <span className="block text-2xl font-bold mb-3 underline decoration-sky-400">Дякую, що хоч розгадав код і зайшов сюда</span>
        <p className="text-lg italic leading-relaxed mb-4">
          Надіюсь, тобі сподобався цей невеликий подарунок. Я вклав у нього достатньо так часу душі, трохи гумору, аішки, способів шукання фото і можливостей пограти в доту/кс/ще щось.
        </p>
      </div>
      <a
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&ab_channel=RickAstley"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg text-lg shadow transition">
          Ну ще раз вітаю з днем народження, або вже пройдешнім!
        </button>
      </a>
    </div>
  )
}

const DotaStats = () => {
  const [winLoss, setWinLoss] = useState({ win: 0, loss: 0 });
  const [sandKingGamesAndWins, setSandKingGamesAndWins] = useState({games: 0, wins: 0})
  const [avatarFullURL, setAvatarFullURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWinRate = () => {
    return fetch("https://api.opendota.com/api/players/342101363/wl")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then(data => {
        setWinLoss({ win: data.win, loss: data.lose });
        console.log(data.win, data.lose);
        console.log("Success");
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  const fetchAvatar = () => {
    return fetch("https://api.opendota.com/api/players/342101363")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw new Error("Error fetching data");
        }
      })
      .then(data => {
        setAvatarFullURL(data.profile.avatarfull);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  const fetchChatMessages = () => {
    return fetch("https://api.opendota.com/api/players/342101363/heroes?hero_id=16")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error fetching data");
      })
      .then(data => {
        setSandKingGamesAndWins({ games: data[0].games, wins: data[0].win })
      })
    }
  useEffect(() => {
    Promise.all([
      fetchAvatar(),
      fetchWinRate(),
      fetchChatMessages()
    ]).finally(() => setIsLoading(false));
  }, []);

  const winrate = winLoss.loss > 0 ? ((winLoss.win / (winLoss.win + winLoss.loss)) * 100).toFixed(1) : "N/A";
  const sandKingWinrate = sandKingGamesAndWins.games > 0 ? ((sandKingGamesAndWins.wins / sandKingGamesAndWins.games) * 100).toFixed(1) : "N/A";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center">
      {isLoading ? (
        <div className="text-sky-400 text-lg">Завантаження...</div>
      ) : (
        <>
          <img src={avatarFullURL} className="mb-6 rounded-full w-28 h-28 object-cover border-4 border-sky-300 shadow" />
          <div className="text-sky-800 font-serif text-center">
            <div className="text-xl font-semibold mb-2">Цікаві факти про тебе:</div>
            <ul className="list-disc list-inside text-lg mb-2">
              <li>Твій вінрейт: <span className="font-bold text-sky-600">{winrate}%</span></li>
              <li>Ігор на Сенд Кінгу: <span className="font-bold text-sky-600">{sandKingGamesAndWins.games}</span>, перемог: <span className="font-bold text-sky-600">{sandKingGamesAndWins.wins}</span> ({sandKingWinrate}%)</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

const BPOProjectInfo = () =>{
  return(
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center">
      <img src="public/YoungOrest.jpg" className="mb-6 rounded-full w-28 h-28 object-cover border-4 border-sky-300 shadow"/>
      <div className="text-sky-800 font-serif text-left">
        <span className="block text-2xl font-bold mb-3 underline decoration-sky-400">
          Тепер трохи про цей проєкт (AKA твій день народження)
        </span>
        <p className="text-lg italic leading-relaxed mb-2">
          Почав я його робити десь в 20 числах липня, з перервою на 10 днів на геймджем, я весь час хотів розказати хоч Дімі, Марічці, чи Ляні, але це б їм спортило трохи сюрприз. Я старався аж настільки, що хочеться попросити вибачення в Марічки за такий маленький подарунок їй).
        </p>
        <p className="text-lg italic leading-relaxed mb-2">
          Насправді, поки я пишу цей текст, подарунок досі не готовий, ще залишилося дописати цей сайт, доробити трохи картки, замовити саму колоду, але надіюся встигну ^^.
        </p>
        <p className="text-lg italic leading-relaxed mb-2">
          Не знаю, чи захочу найближчим часом робити щось таке ж велике, але я радий, що я за це взявся і (поки що майже) довів справу до кінця, ну а ще сайт я захотів зробити чисто тому що якось зновау перед Марічкою вийшло, що вона мені трхи показувала і я щось на довстатньо довгий час забив на то.
        </p>
        <p className="text-lg italic leading-relaxed mb-2">
          Якщо ще з коротких побажань то фоткайтеся більше з Дімою, бо ваші фотки було не так і легко знайти зразу.
        </p>
        <p className="text-lg italic leading-relaxed">
          Мта, перечитуючи цей текст, є відчуття ніби це якийсь більш лист смертника і я мав би скоро зробити суїціид, ну хто зна, може колись таке і трапиться.
        </p>
      </div>
    </div>
  )
}


const App = () => {
  const [isAllowedToView, setIsAllowedToView] = useState(false);
  const password = 2005;
  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const allowed = prompt("Enter password:") === String(password);
    setIsAllowedToView(allowed);
    setChecked(true);
  }, []);
useEffect(() => {
    console.log(isAllowedToView)
  }, [isAllowedToView]);

  if (!checked) return null; // or loading screen
  if (!isAllowedToView) return <div className="text-center mt-20 text-red-600 text-xl">Access Denied</div>;

  
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }; 
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200">
      <TopBar 
        scrollToSection={scrollToSection}
        section1Ref={section1Ref}
        section2Ref={section2Ref}
        section3Ref={section3Ref}
      />
      <div className="mx-auto max-w-2xl rounded-3xl text-center p-6 mt-8">
        <div ref={section1Ref} className="scroll-mt-24"><Home /></div>
        <div ref={section2Ref} className="scroll-mt-24"><DotaStats /></div>
        <div ref={section3Ref} className="scroll-mt-24"><BPOProjectInfo /></div>
      </div>
    </div>
  )
}

export default App
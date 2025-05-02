import { useNavigate } from "react-router-dom";
import {
  apple_music_about,
  deezer,
  share_music,
  spotify,
  yandex_music
} from "../../shared/assets";

function TrackSearch() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full mt-16 justify-center items-center">
      <div className="flex flex-col w-full items-center justify-center gap-4 text-white px-5 max-w-[370px] sm:max-w-[1200px] ">  
        <div className="block sm:hidden text-start mb-6 sm:mb-10">
            <p>Поддерживаемые сервисы</p>
            <div className="flex gap-4 items-center mt-4 flex-wrap">
              <img src={deezer} alt="deezer" />
              <img src={spotify} alt="spotify" />
              <img src={apple_music_about} alt="apple music" />
              <img src={yandex_music} alt="yandex music" />
            </div>
          </div>      
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-10">
          <h1 className="text-[75px] sm:text-[100px] md:text-[200px] leading-none animate-fadeInUp">Track</h1>
          <p className="sm:pb-8 text-start w-full sm:max-w-[400px]">
            С нашим сервисом делиться любимой музыкой стало проще простого – всего три шага!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row relative items-start sm:items-end gap-8 sm:gap-[35px] w-full">
          
          <div className="hidden sm:block order-3 sm:order-1 text-start mb-6 sm:mb-10">
            <p>Поддерживаемые сервисы</p>
            <div className="flex gap-4 items-center mt-4 flex-wrap">
              <img src={deezer} alt="deezer" />
              <img src={spotify} alt="spotify" />
              <img src={apple_music_about} alt="apple music" />
              <img src={yandex_music} alt="yandex music" />
            </div>
          </div>

          <h1 className="text-end w-[100%] sm:w-[70%] order-2 sm:order-2 text-[75px] sm:text-[100px] md:text-[200px] leading-none animate-fadeInUp">
            Linker
          </h1>

          <div className="order-4 sm:order-3 sm:absolute sm:right-30 sm:-bottom-10">
            <button onClick={() => navigate('/song/1')} className="bg-[#B62CB6] border-none py-2 px-4 text-sm text-white hover:bg-[#B63CB6] gap-2 font-light flex items-center rounded transition">
              Пошарить музыку
              <img src={share_music} alt="share" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackSearch;

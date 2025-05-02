import React, { useState } from 'react';
import { header_logo } from '../assets';
import { useNavigate } from 'react-router-dom';
const Header: React.FC = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate()
    return (
        <header className="hidden sm:flex justify-between items-center p-8 text-white">
            <div className="text-xl flex gap-2 items-center justify-center text-center text-normal font-[Overpass] font-bold font-light">
                <img src={header_logo}></img>
                <p>TrackLinker</p>
            </div>
            <nav className="flex space-x-6 pr-20">
                <ul className="flex gap-20">
                    <li onClick={() => navigate('/')} className="hover:text-gray-300 cursor-pointer font-[Inter] font-light">Главная</li>
                    <li
                        className="relative hover:text-gray-300 cursor-pointer font-light"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        Как пользоваться сервисом
                        {showTooltip && (
                            <div className="absolute top-full -left-72 mt-5 w-145 bg-stone-900 text-white p-6 shadow-md rounded-xl text-start">
                                <h2 className='font-bold text-lg'>Как пользоваться платформой</h2>
                                <div className='flex gap-2 items-center justify-center mt-4'>
                                    <h1 className='font-[Rubik] !text-xl text-[#B62CB6] font-bold'>1.</h1>
                                    <p className='!text-sm'>Найдите нужную песню в любом музыкальном сервисе, нажмите «Поделиться» и скопируйте ссылку.</p>
                                </div>
                                <div className='flex gap-2 items-center justify-center mt-4'>
                                    <h1 className='font-[Rubik] !text-xl text-[#B62CB6] font-bold'>2.</h1>
                                    <p className='!text-sm'>Откройте TrackLinker и вставьте ссылку в поле «Введите ссылку на песню».</p>
                                </div>
                                <div className='flex gap-2 items-center justify-center mt-4'>
                                    <h1 className='font-[Rubik] !text-xl text-[#B62CB6] font-bold'>3.</h1>
                                    <p className='!text-sm'>Мгновенно получите готовую композицию, чтобы поделиться ею с другом.</p>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
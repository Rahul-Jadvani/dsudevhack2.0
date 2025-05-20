
import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  targetDate: Date;
};

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-wrap justify-start items-center gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-6xl font-bold bg-hackathon-darkBlue/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-700 min-w-[80px] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 transform -skew-y-12"></div>
          <div className="relative z-10">{formatNumber(timeLeft.days)}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span className="text-gray-400 mt-2">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-6xl font-bold bg-hackathon-darkBlue/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-700 min-w-[80px] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-500/5 transform -skew-y-12"></div>
          <div className="relative z-10">{formatNumber(timeLeft.hours)}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span className="text-gray-400 mt-2">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-6xl font-bold bg-hackathon-darkBlue/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-700 min-w-[80px] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyan-500/5 transform -skew-y-12"></div>
          <div className="relative z-10">{formatNumber(timeLeft.minutes)}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span className="text-gray-400 mt-2">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-6xl font-bold bg-hackathon-darkBlue/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-700 min-w-[80px] text-center relative overflow-hidden group animate-pulse">
          <div className="absolute inset-0 bg-orange-500/5 transform -skew-y-12"></div>
          <div className="relative z-10">{formatNumber(timeLeft.seconds)}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span className="text-gray-400 mt-2">Seconds</span>
      </div>
    </div>
  );
};

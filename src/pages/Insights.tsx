
import { MainLayout } from '../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';

export const Insights = () => {
  const insights = [
    {
      title: "Record Participation",
      description: "Over 5,000 developers from 120 countries participated in DEVHACK 2024, making it one of the largest virtual hackathons ever held.",
      image: "public/lovable-uploads/94cb9b56-8151-44e7-8b21-b3da14be0424.png",
      stats: [
        { value: "5,000+", label: "Participants" },
        { value: "120", label: "Countries" },
        { value: "800+", label: "Projects" }
      ]
    },
    {
      title: "Winning Projects",
      description: "The winning projects demonstrated exceptional innovation, technical excellence, and real-world impact. Here's a look at what made them stand out.",
      image: "public/lovable-uploads/ad0361df-e882-4d92-bee9-4ca400ea9de3.png",
      stats: [
        { value: "$450K", label: "Prize Pool" },
        { value: "9", label: "Categories" },
        { value: "36", label: "Winners" }
      ]
    },
    {
      title: "Community Impact",
      description: "DEVHACK projects have made a significant difference in various communities worldwide, from healthcare solutions to educational tools.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Community+Impact",
      stats: [
        { value: "50+", label: "Countries Impacted" },
        { value: "200K+", label: "Users" },
        { value: "12", label: "NGO Partnerships" }
      ]
    },
    {
      title: "Technology Trends",
      description: "The most popular technologies and frameworks used in DEVHACK 2024 revealed interesting insights about current developer preferences.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Tech+Trends",
      stats: [
        { value: "65%", label: "Used React" },
        { value: "45%", label: "Used AI" },
        { value: "30%", label: "Used Web3" }
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <MainLayout backgroundVariant="light">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <LayoutDashboard className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold">DEVHACK 2024 Insights</h1>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A look back at last year's amazing projects, achievements, and community impact
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {insights.map((insight, index) => (
            <motion.div 
              key={index}
              className="bg-hackathon-darkBlue border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300"
              variants={item}
            >
              <div className="h-64 overflow-hidden">
                <img src={insight.image} alt={insight.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{insight.title}</h3>
                <p className="text-gray-300 mb-6">{insight.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  {insight.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All 2024 Projects
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
};

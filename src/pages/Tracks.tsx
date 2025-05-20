
import { MainLayout } from '../components/layout/MainLayout';

export const Tracks = () => {
  return (
    <MainLayout>
      <div className="container px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Tracks</h1>
        
        <div className="mb-16">
          <div className="h-[1px] w-full bg-gray-700 mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Track prizes</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { place: "1st place", prize: "$30,000 USD", color: "yellow" },
              { place: "2nd place", prize: "$15,000 USD", color: "blue" },
              { place: "3rd place", prize: "$10,000 USD", color: "yellow" },
              { place: "4th place", prize: "$7,500 USD", color: "green" },
            ].map((item, index) => (
              <div key={index} className="border border-gray-700 overflow-hidden">
                <div className="bg-gray-800/50 border-b border-gray-700 p-3">
                  <span className="mr-2 text-green-500">#</span>
                  <span className={`text-${item.color}-400`}>{item.place}</span>
                </div>
                <div className="bg-hackathon-cream/10 p-8 h-48 flex items-center justify-center">
                  {/* Prize image placeholder */}
                  <div className={`w-24 h-24 rounded-full bg-${item.color}-500/20 flex items-center justify-center`}>
                    <span className={`text-${item.color}-400 text-4xl`}>$</span>
                  </div>
                </div>
                <div className="p-6 bg-black/20">
                  <div className="text-2xl font-bold">{item.prize}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <div className="h-[1px] w-full bg-gray-700 mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Awards</h2>
          <p className="text-gray-400 mb-8">These can be won alongside other prizes.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Innovation Award",
                description: "For projects demonstrating exceptional technical innovation and originality.",
                prize: "$5,000 USD"
              },
              {
                title: "Impact Award",
                description: "For projects with potential to create significant real-world impact.",
                prize: "$5,000 USD"
              },
              {
                title: "Design Excellence",
                description: "For projects with outstanding UX/UI design and user experience.",
                prize: "$5,000 USD"
              },
            ].map((award, index) => (
              <div key={index} className="border border-gray-700 bg-hackathon-darkBlue p-6 rounded">
                <h3 className="text-xl font-bold mb-3">{award.title}</h3>
                <p className="text-gray-300 mb-4">{award.description}</p>
                <div className="text-xl font-bold text-green-400">{award.prize}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="h-[1px] w-full bg-gray-700 mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Tracks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "DeFi",
                color: "purple",
                description: "Build next-gen DeFi apps on Sui with a special focus on BTCFi & novel uses for BTC bridging to Sui. Create innovative financial tools, DEXes, lending protocols, or asset management solutions that leverage Sui's unique features.",
                sponsor: "PYTH",
                bgClass: "bg-purple-900/20"
              },
              {
                name: "Infra & Tooling",
                color: "pink",
                description: "Develop building blocks and dev tooling for greater scalability, composability, and interoperability. Build tools that improve developer experience, enhance cross-chain communication, or provide better indexing and data availability.",
                sponsor: "UNI",
                bgClass: "bg-pink-600/20"
              },
              {
                name: "AI",
                color: "green",
                description: "Leverage Sui to build agents and apps at the intersection of AI and decentralized technology. Create AI-powered dApps, on-chain AI agents, decentralized machine learning protocols, or AI governance solutions.",
                sponsor: "Alibaba Cloud",
                bgClass: "bg-green-900/20"
              },
              {
                name: "Cryptography",
                color: "yellow",
                description: "Explore cryptographic innovations and applications on the Sui platform. Implement zero-knowledge proofs, threshold cryptography, secure multiparty computation, or novel privacy solutions.",
                sponsor: "Wormhole",
                bgClass: "bg-yellow-500/20"
              },
              {
                name: "Degen",
                color: "cyan",
                description: "Create engaging degen content, games, and experiences for the Sui ecosystem. Build on-chain games, gambling protocols, NFT projects, social platforms, or metaverse applications.",
                sponsor: "Scallop",
                bgClass: "bg-cyan-500/20"
              }
            ].map((track, index) => (
              <div key={index} className={`border border-gray-700 rounded overflow-hidden`}>
                <div className="p-4 border-b border-gray-700 grid grid-cols-12 gap-2">
                  <div className="col-span-2">
                    <div className={`${track.bgClass} h-16 w-full flex items-center justify-center rounded`}>
                      <span className={`text-${track.color}-500 text-2xl`}>→</span>
                    </div>
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-xl font-bold">{track.name}</h3>
                  </div>
                </div>
                <div className={`${track.bgClass} p-12 h-64 flex items-center justify-center`}>
                  {/* Track image placeholder */}
                  <div className={`w-32 h-32 rounded-full bg-${track.color}-500/30 animate-pulse-light`}></div>
                </div>
                <div className="p-6 bg-gray-900/50">
                  <p className="text-gray-300 mb-4">{track.description}</p>
                  <div className="text-sm text-gray-400">Track sponsor: {track.sponsor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

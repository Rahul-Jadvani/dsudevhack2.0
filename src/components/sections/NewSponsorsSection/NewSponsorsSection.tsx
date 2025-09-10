import "./NewSponsorsSection.css";
import "./NewSponsorsGrid.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SponsorLogo {
  name: string;
  logoUrl: string;
  bgColor?: string;
  website?: string;
}

export const NewSponsorsSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const heading = titleRef.current;

    ScrollTrigger.create({
      trigger: heading,
      start: "top 80%",
      onEnter: () => {
        heading.classList.remove("typewriter");
        void heading.offsetWidth;
        heading.classList.add("typewriter");
      },
      onLeaveBack: () => {
        heading.classList.remove("typewriter");
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const diamondSponsors: SponsorLogo[] = [
    {
      name:"Kroolo",
      logoUrl:"/sponsors/kroolo.png",
      website:"https://kroolo.com"
    }
  ];

  const platinumRowSponsors: SponsorLogo[] = [
    {
      name: "GitHub",
      logoUrl: "/sponsors/GitHub Logos/PNG/GitHub_Lockup_Light.png",
    },
    {
      name: "Airia",
      logoUrl: "/sponsors/airia.png",
      website:"https://airia.com"
    },
    {
      name: "n8n",
      logoUrl:"/sponsors/n8n1.png",
      website:"https://n8n.io/"
    }
  ];

  const topRowSponsors: SponsorLogo[] = [
    {
      name: "AIC DSU Innovation Foundation",
      logoUrl: "/sponsors/aic-dsu.png",
    },
    {
      name: ".xyz",
      logoUrl: "/sponsors/xyz-white-logo.svg",
    },
    {
      name: "CodeCrafters.io",
      logoUrl: "/sponsors/CodeCraft.png",
    },
    {
      name: "Trae",
      logoUrl: "/sponsors/trae.png",
      website: "https://www.trae.ai/"
    }
  ];

  const middleRowSponsors: SponsorLogo[] = [
    {
      name: "ETH India",
      logoUrl: "/sponsors/ethindia-light.svg",
      website: "https://ethindia.co",
    },
    {
      name: "Interview buddy",
      logoUrl: "/sponsors/interview.jpg",
      website: "https://InterviewBuddy.net",
    },
    
  ];

  const bottomRowSponsors: SponsorLogo[] = [
    {
      name: "Devfolio",
      logoUrl: "/sponsors/Devfolio_Logo-White.png",
      website: "https://devfolio.co",
    },
  ];
   // 🆕 Media Partners
   const mediaPartners: SponsorLogo[] = [
    { name: "Le Gras Boulevard", 
      logoUrl: "/sponsors/Le Gras Blvd.png",
      website: "https://linktr.ee/legrasblvd" },
    { name: "Eventopia", 
      logoUrl: "/sponsors/Eventopia-Logo-04.png",
      website: "https://eventopia.in" },
  ];

  // 🆕 Community Partners
  const communityPartners: SponsorLogo[] = [
    { name: "Apex Circle", logoUrl: "/sponsors/apex.png", 
      website: "https://bento.me/apex-circle-official"
    },
    {
      name:"HACKX Community",
      logoUrl:"/sponsors/hackx.jpg",
      website:"https://bento.me/hackx-community"
    },
    {
      name:"Code Junction",
      logoUrl:"/sponsors/CJ.svg",
      website:"https://coding-junction.in/"
    },
    {
      name:"theDevArmy",
      logoUrl:"/sponsors/thedev.png",
    }
  ];
  const titlesponsor: SponsorLogo[] = [
    { name: "Vultr",
      logoUrl: "/sponsors/vultr.png", 
    },
  ];

  const getAltText = (name: string) => {
    switch (name) {
      case "ETH India":
        return "ETHINDIA LOGO";
      case "Devfolio":
        return "DEVFOLIO LOGO";
      case "AIC DSU Innovation Foundation":
        return "AIC DSU INNOVATION FOUNDATION LOGO";
      default:
        return `${name} LOGO`;
    }
  };

  return (
    <section id="sponsors" className="new-sponsors-section">
      <div className="container mx-auto px-4 py-8">
        <h2 className="sponsors-title text-center mb-12" ref={titleRef}>
          Our Sponsors
        </h2>

         <div className="sponsors-grid-container mb-12">
          <div className="sponsors-grid-heading">
            <h4 className="">Title Sponsors</h4>
          </div>

          <div className="sponsors-title-row">
            {titlesponsor.length > 0 ? (
              titlesponsor.map((sponsor, index) => {
                const Wrapper = sponsor.website ? "a" : "div";
                return (
                  <Wrapper
                    key={`platinum-${index}`}
                    className="sponsor-title-box"
                    {...(sponsor.website
                      ? {
                          href: sponsor.website,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <div className="sponsor-title-label">
                      <span data-sponsor-el="left">{sponsor.name}</span>
                      <span data-sponsor-el="arrow">[↗]</span>
                    </div>
                    <div className="sponsor-logo-wrapper">
                      <img
                        src={sponsor.logoUrl}
                        alt={getAltText(sponsor.name)}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/200?text=" +
                            sponsor.name;
                        }}
                      />
                    </div>
                  </Wrapper>
                );
              })
            ) : (
              <div className="sponsor-title-box flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">
                  {Array.from(`COMING SOON`).map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 animate-pulse"
                      style={{
                        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${
                          index * 0.1
                        }s infinite`,
                        textShadow:
                          "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div> 

    <div className="sponsors-grid-container mb-12">
          <div className="sponsors-grid-heading">
            <h4 className="">Diamond Sponsors</h4>
          </div>

          <div className="sponsors-diamond-row ">
            {diamondSponsors.length > 0 ? (
              diamondSponsors.map((sponsor, index) => {
                const Wrapper = sponsor.website ? "a" : "div";
                return (
                  <Wrapper
                    key={`diamond-${index}`}
                    className="sponsor-diamond-box"
                    {...(sponsor.website
                      ? {
                          href: sponsor.website,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <div className="sponsor-n-label">
                      <span data-sponsor-el="left">{sponsor.name}</span>
                      <span data-sponsor-el="arrow">[↗]</span>
                    </div>
                    <div className="sponsor-logo-wrapper ">
                      <img
                        src={sponsor.logoUrl}
                        alt={getAltText(sponsor.name)}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/200?text=" +
                            sponsor.name;
                        }}
                      />
                    </div>
                  </Wrapper>
                );
              })
            ) : (
              <div className="sponsor-diamond-box flex flex-col items-center justify-center ">
                <div className="text-4xl font-bold text-center">
                  {Array.from(`COMING SOON`).map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 animate-pulse"
                      style={{
                        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${
                          index * 0.1
                        }s infinite`,
                        textShadow:
                          "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sponsors-grid-container mb-12">
          <div className="sponsors-grid-heading">
            <h4 className="">Platinum Sponsors</h4>
          </div>

          <div className="sponsors-platinum-row">
            {platinumRowSponsors.length > 0 ? (
              platinumRowSponsors.map((sponsor, index) => {
                const Wrapper = sponsor.website ? "a" : "div";
                return (
                  <Wrapper
                    key={`platinum-${index}`}
                    className="sponsor-platinum-box"
                    {...(sponsor.website
                      ? {
                          href: sponsor.website,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <div className="sponsor-name-label">
                      <span data-sponsor-el="left">{sponsor.name}</span>
                      <span data-sponsor-el="arrow">[↗]</span>
                    </div>
                    <div className="sponsor-logo-wrapper overflow-x-auto">
  <img
    src={sponsor.logoUrl}
    alt={getAltText(sponsor.name)}
    loading="lazy"
    className={
      sponsor.name === "Airia"
        ? "!w-72 !h-auto !max-h-none" // Airia (18rem wide)
        : sponsor.name === "n8n"
        ? "min-w-[28rem] !w-[28rem] sm:!w-[40rem] md:!w-[50rem] lg:!w-[60rem] !h-auto !max-h-none"
        : ""
    }
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src =
        "https://via.placeholder.com/200?text=" + sponsor.name;
    }}
  />
</div>


                  </Wrapper>
                );
              })
            ) : (
              <div className="sponsor-platinum-box flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">
                  {Array.from(`COMING SOON`).map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 animate-pulse"
                      style={{
                        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${
                          index * 0.1
                        }s infinite`,
                        textShadow:
                          "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="sponsors-grid-heading">
            <h4> Gold Sponsors</h4>
          </div>

          <div className="sponsors-top-row ">
            {topRowSponsors.map((sponsor, index) => {
              const Wrapper = sponsor.website ? "a" : "div";
              return (
                <Wrapper
                  key={`top-${index}`}
                  className="sponsor-top-box"
                  {...(sponsor.website
                    ? {
                        href: sponsor.website,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                >
                  <div className="sponsor-name-label">
                    <span data-sponsor-el="left">{sponsor.name}</span>
                    <span data-sponsor-el="arrow">[↗]</span>
                  </div>
                  <div className="sponsor-logo-wrapper">
  <img
    src={sponsor.logoUrl}
    alt={getAltText(sponsor.name)}
    loading="lazy"
    className={
      sponsor.name === "n8n"
        ? "!w-[600px] !h-[400px] !max-h-none !max-w-none object-contain" // reduced size (18rem)
        : ""
    }
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src =
        "https://via.placeholder.com/200?text=" + sponsor.name;
    }}
  />
</div>


                </Wrapper>
              );
            })}
          </div>

          <div className="sponsors-grid-heading">
            <h4>Silver Sponsors</h4>
          </div>

          <div className="sponsors-bottom-row">
             {middleRowSponsors.map((sponsor, index) => {
               const Wrapper = sponsor.website ? "a" : "div";
               return (
                 <Wrapper
                   key={`bottom-${index}`}
                   className="sponsor-bottom-box"
                   {...(sponsor.website
                     ? {
                         href: sponsor.website,
                         target: "_blank",
                         rel: "noopener noreferrer",
                       }
                     : {})}
                 >
                   <div className="sponsor-name-label">
                     <span data-sponsor-el="left">{sponsor.name}</span>
                     <span data-sponsor-el="arrow">[↗]</span>
                   </div>
                   <div className="sponsor-logo-wrapper">
                     <img
                       src={sponsor.logoUrl}
                       alt={getAltText(sponsor.name)}
                       loading="lazy"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src =
                           "https://via.placeholder.com/100?text=" +
                           sponsor.name;
                       }}
                     />
                   </div>
                 </Wrapper>
               );
             })}
           </div>

          <div className="sponsors-grid-heading">
            <h4>Media Partners</h4>
          </div>

             <div className="sponsors-bottom-row">
             {mediaPartners.map((sponsor, index) => {
               const Wrapper = sponsor.website ? "a" : "div";
               return (
                 <Wrapper
                   key={`bottom-${index}`}
                   className="sponsor-bottom-box"
                   {...(sponsor.website
                     ? {
                         href: sponsor.website,
                         target: "_blank",
                         rel: "noopener noreferrer",
                       }
                     : {})}
                 >
                   <div className="sponsor-name-label">
                     <span data-sponsor-el="left">{sponsor.name}</span>
                     <span data-sponsor-el="arrow">[↗]</span>
                   </div>
                   <div className="sponsor-logo-wrapper">
                     <img
                       src={sponsor.logoUrl}
                       alt={getAltText(sponsor.name)}
                       loading="lazy"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src =
                           "https://via.placeholder.com/100?text=" +
                           sponsor.name;
                       }}
                     />
                   </div>
                 </Wrapper>
               );
             })}
           </div>

          <div className="sponsors-grid-heading">
            <h4 className="">Community Partners</h4>
          </div>

     <div className="sponsors-bottom-row">
     {communityPartners.map((sponsor, index) => {
       const Wrapper = sponsor.website ? "a" : "div";
       return (
         <Wrapper
           key={`bottom-${index}`}
           className="sponsor-bottom-box"
           {...(sponsor.website
             ? {
                 href: sponsor.website,
                 target: "_blank",
                 rel: "noopener noreferrer",
               }
             : {})}
         >
           <div className="sponsor-name-label">
             <span data-sponsor-el="left">{sponsor.name}</span>
             <span data-sponsor-el="arrow">[↗]</span>
           </div>
           <div className="sponsor-logo-wrapper">
             <img
               src={sponsor.logoUrl}
               alt={getAltText(sponsor.name)}
               loading="lazy"
               onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.src =
                   "https://via.placeholder.com/100?text=" +
                   sponsor.name;
               }}
             />
           </div>
         </Wrapper>
       );
     })}
   </div>




          <div className="sponsors-grid-heading">
            <h4>Platform partner</h4>
          </div>

          <div className="sponsors-bottom-row">
            {bottomRowSponsors.map((sponsor, index) => {
              const Wrapper = sponsor.website ? "a" : "div";
              return (
                <Wrapper
                  key={`bottom-${index}`}
                  className="sponsor-bottom-box"
                  {...(sponsor.website
                    ? {
                        href: sponsor.website,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                >
                  <div className="sponsor-name-label">
                    <span data-sponsor-el="left">{sponsor.name}</span>
                    <span data-sponsor-el="arrow">[↗]</span>
                  </div>
                  <div className="sponsor-logo-wrapper">
                    <img
                      src={sponsor.logoUrl}
                      alt={getAltText(sponsor.name)}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://via.placeholder.com/100?text=" +
                          sponsor.name;
                      }}
                    />
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
